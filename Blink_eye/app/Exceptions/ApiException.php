<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Renderable API exception for standardized JSON error responses.
 *
 * Provides a consistent format for API errors including:
 * - Error code
 * - Message
 * - Details
 * - HTTP status code
 */
class ApiException extends Exception
{
    /**
     * The error code for the exception.
     */
    protected string $errorCode;

    /**
     * Additional error details.
     */
    protected array $details;

    /**
     * Create a new API exception instance.
     *
     * @param  string  $message  The error message
     * @param  string  $errorCode  The error code identifier
     * @param  int  $statusCode  The HTTP status code
     * @param  array  $details  Additional error details
     * @param  Exception|null  $previous  The previous exception
     */
    public function __construct(
        string $message = 'An error occurred',
        string $errorCode = 'INTERNAL_ERROR',
        int $statusCode = 500,
        array $details = [],
        ?Exception $previous = null
    ) {
        parent::__construct($message, $statusCode, $previous);

        $this->errorCode = $errorCode;
        $this->details = $details;
    }

    /**
     * Get the error code.
     */
    public function getErrorCode(): string
    {
        return $this->errorCode;
    }

    /**
     * Get the error details.
     */
    public function getDetails(): array
    {
        return $this->details;
    }

    /**
     * Render the exception as an HTTP response.
     */
    public function render(Request $request): JsonResponse
    {
        $response = [
            'success' => false,
            'error' => [
                'code' => $this->errorCode,
                'message' => $this->getMessage(),
            ],
        ];

        if (! empty($this->details)) {
            $response['error']['details'] = $this->details;
        }

        // Include request UUID for tracking if available
        if ($request->has('request_id')) {
            $response['request_id'] = $request->input('request_id');
        }

        return response()->json($response, $this->getCode());
    }

    /**
     * Create a new API exception for not found resources.
     */
    public static function notFound(string $message = 'Resource not found', string $resourceType = 'resource'): static
    {
        return new static (
            $message,
            'NOT_FOUND',
            404,
            ['resource_type' => $resourceType]
        );
    }

    /**
     * Create a new API exception for validation errors.
     */
    public static function validationError(string|array $message = 'Validation failed', array $errors = []): static
    {
        return new static (
            is_array($message) ? 'Validation failed' : $message,
            'VALIDATION_ERROR',
            422,
            ['errors' => $errors]
        );
    }

    /**
     * Create a new API exception for unauthorized access.
     */
    public static function unauthorized(string $message = 'Unauthorized access'): static
    {
        return new static (
            $message,
            'UNAUTHORIZED',
            401
        );
    }

    /**
     * Create a new API exception for forbidden access.
     */
    public static function forbidden(string $message = 'Access forbidden'): static
    {
        return new static (
            $message,
            'FORBIDDEN',
            403
        );
    }

    /**
     * Create a new API exception for rate limiting.
     */
    public static function rateLimited(string $message = 'Too many requests'): static
    {
        return new static (
            $message,
            'RATE_LIMITED',
            429
        );
    }
}
