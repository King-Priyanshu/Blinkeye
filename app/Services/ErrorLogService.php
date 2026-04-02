<?php

namespace App\Services;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Log\LogManager;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\MessageBag;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Exceptions\UnauthorizedException;

/**
 * Error logging service for centralized error tracking.
 *
 * Provides methods to log errors with contextual information
 * including user ID, URL, input data, and request UUID.
 */
class ErrorLogService
{
    /**
     * The request UUID for tracking.
     */
    protected ?string $requestUuid = null;

    /**
     * Create a new ErrorLogService instance.
     */
    public function __construct()
    {
        $this->requestUuid = $this->generateRequestUuid();
    }

    /**
     * Generate a unique request UUID for tracking.
     */
    protected function generateRequestUuid(): string
    {
        return Str::uuid()->toString();
    }

    /**
     * Get the current request UUID.
     */
    public function getRequestUuid(): string
    {
        return $this->requestUuid;
    }

    /**
     * Set the request UUID from the current request.
     */
    public function setFromRequest(Request $request): self
    {
        // Check if there's an existing request ID (from headers or session)
        $requestId = $request->header('X-Request-ID')
            ?? $request->session()->get('request_id')
            ?? $this->generateRequestUuid();

        $this->requestUuid = $requestId;

        return $this;
    }

    /**
     * Log a general error with context.
     *
     * @param  \Throwable|\Exception  $exception
     * @param  array  $context  Additional context data
     */
    public function logError(\Throwable $exception, array $context = []): void
    {
        $logData = $this->prepareLogData($exception, $context);

        Log::error($exception->getMessage(), $logData);
    }

    /**
     * Log a validation error with detailed information.
     *
     * @param  ValidationException|MessageBag  $validationErrors
     */
    public function logValidationError($validationErrors, ?Request $request = null): void
    {
        $errors = $validationErrors instanceof ValidationException
            ? $validationErrors->errors()
            : $validationErrors->toArray();

        $context = [
            'errors' => $errors,
            'timestamp' => now()->toIso8601String(),
        ];

        if ($request) {
            $context['url'] = $request->fullUrl();
            $context['method'] = $request->method();
            $context['input'] = $this->sanitizeInput($request->all());
            $context['user_id'] = $request->user()?->id;
            $context['ip'] = $request->ip();
        }

        $logData = $this->prepareLogData(
            new \Exception('Validation failed'),
            $context
        );

        Log::warning('Validation Error', $logData);
    }

    /**
     * Log a database query error.
     *
     * @param  \Exception|QueryException  $exception
     * @param  string|null  $query  The SQL query (optional, already in exception)
     * @param  array  $bindings  Query bindings
     */
    public function logQueryError(\Exception $exception, ?string $query = null, array $bindings = []): void
    {
        $context = [
            'query' => $query,
            'bindings' => $bindings,
            'timestamp' => now()->toIso8601String(),
        ];

        // Add additional context for QueryException
        if ($exception instanceof QueryException) {
            $context['sql'] = $exception->getSql();
            $context['bindings'] = $exception->getBindings();
        }

        $logData = $this->prepareLogData($exception, $context);

        Log::error('Database Query Error', $logData);
    }

    /**
     * Log an API error with request/response details.
     *
     * @param  int|null  $statusCode  HTTP status code
     */
    public function logApiError(\Throwable $exception, Request $request, ?int $statusCode = null): void
    {
        $context = [
            'url' => $request->fullUrl(),
            'method' => $request->method(),
            'headers' => $this->sanitizeHeaders($request->headers->all()),
            'input' => $this->sanitizeInput($request->all()),
            'user_id' => $request->user()?->id,
            'ip' => $request->ip(),
            'status_code' => $statusCode ?? $exception->getCode(),
            'timestamp' => now()->toIso8601String(),
        ];

        $logData = $this->prepareLogData($exception, $context);

        Log::error('API Error', $logData);
    }

    /**
     * Log an authorization error.
     *
     * @param  AuthorizationException|UnauthorizedException  $exception
     */
    public function logAuthorizationError($exception, ?Request $request = null): void
    {
        $context = [
            'message' => $exception->getMessage(),
            'timestamp' => now()->toIso8601String(),
        ];

        if ($request) {
            $context['url'] = $request->fullUrl();
            $context['method'] = $request->method();
            $context['user_id'] = $request->user()?->id;
        }

        $logData = $this->prepareLogData($exception, $context);

        Log::warning('Authorization Error', $logData);
    }

    /**
     * Prepare log data with consistent formatting.
     */
    protected function prepareLogData(\Throwable $exception, array $context = []): array
    {
        return array_merge([
            'request_id' => $this->requestUuid,
            'exception_class' => get_class($exception),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => $exception->getTraceAsString(),
        ], $context);
    }

    /**
     * Sanitize user input to remove sensitive data.
     */
    protected function sanitizeInput(array $input): array
    {
        $sensitiveKeys = ['password', 'password_confirmation', 'token', 'secret', 'api_key', 'credit_card'];

        foreach ($sensitiveKeys as $key) {
            if (isset($input[$key])) {
                $input[$key] = '[REDACTED]';
            }
        }

        return $input;
    }

    /**
     * Sanitize HTTP headers to remove sensitive data.
     */
    protected function sanitizeHeaders(array $headers): array
    {
        $sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];

        foreach ($headers as $key => $value) {
            if (in_array(strtolower($key), $sensitiveHeaders)) {
                $headers[$key] = ['[REDACTED]'];
            }
        }

        return $headers;
    }

    /**
     * Create a log channel for specific error types.
     */
    public function channel(string $channel): LogManager
    {
        return Log::channel($channel);
    }
}
