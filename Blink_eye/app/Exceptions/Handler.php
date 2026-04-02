<?php

namespace App\Exceptions;

use App\Services\ErrorLogService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Validation\ValidationException;
use Psr\Log\LogLevel;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Throwable;

/**
 * Custom exception handler for the application.
 *
 * Handles JSON API responses differently from web responses,
 * logs validation errors, and provides custom handling for
 * ModelNotFoundException and AuthorizationException.
 */
class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<Throwable>, LogLevel::*>
     */
    protected $levels = [
        ValidationException::class => LogLevel::WARNING,
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        ApiException::class,
    ];

    /**
     * The error log service instance.
     */
    protected ErrorLogService $errorLogService;

    /**
     * Create a new exception handler instance.
     *
     * @return void
     */
    public function __construct(ErrorLogService $errorLogService)
    {
        $this->errorLogService = $errorLogService;
        parent::__construct(app());
    }

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Report or log an exception.
     *
     *
     * @throws \Exception
     */
    public function report(Throwable $e): void
    {
        // Use the error log service to properly log errors
        if ($this->shouldReport($e)) {
            $this->errorLogService->logError($e, $this->getContext());
        }

        parent::report($e);
    }

    /**
     * Determine if the exception should be reported.
     */
    public function shouldReport(Throwable $e): bool
    {
        return parent::shouldReport($e);
    }

    /**
     * Get additional context for error logging.
     */
    protected function getContext(): array
    {
        $context = [];

        // Add user ID if authenticated
        if ($user = request()->user()) {
            $context['user_id'] = $user->id;
        }

        // Add current URL
        $context['url'] = request()->fullUrl();

        // Add request method
        $context['method'] = request()->method();

        return $context;
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  Request  $request
     *
     * @throws Throwable
     */
    public function render($request, Throwable $e): Response
    {
        // Set up error log service with current request
        $this->errorLogService->setFromRequest($request);

        // Handle API exceptions first
        if ($e instanceof ApiException) {
            return $this->handleApiException($request, $e);
        }

        // Handle JSON/API requests
        if ($request->expectsJson() || $request->is('api/*')) {
            return $this->handleJsonException($request, $e);
        }

        // Handle web requests
        return $this->handleWebException($request, $e);
    }

    /**
     * Handle API exceptions.
     */
    protected function handleApiException(Request $request, Throwable $e): JsonResponse
    {
        $statusCode = $e->getCode() ?: 500;

        // Log API errors
        $this->errorLogService->logApiError($e, $request, $statusCode);

        $response = [
            'success' => false,
            'error' => [
                'code' => method_exists($e, 'getErrorCode') ? $e->getErrorCode() : 'ERROR',
                'message' => $e->getMessage(),
            ],
            'request_id' => $this->errorLogService->getRequestUuid(),
        ];

        if (method_exists($e, 'getDetails') && ! empty($e->getDetails())) {
            $response['error']['details'] = $e->getDetails();
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Handle JSON exceptions for API requests.
     */
    protected function handleJsonException(Request $request, Throwable $e): JsonResponse
    {
        $statusCode = $this->getStatusCode($e);
        $message = $this->getExceptionMessage($e);

        // Log the error
        $this->errorLogService->logApiError($e, $request, $statusCode);

        $response = [
            'success' => false,
            'error' => [
                'code' => $this->getErrorCode($e),
                'message' => $message,
            ],
            'request_id' => $this->errorLogService->getRequestUuid(),
        ];

        // Add validation errors if applicable
        if ($e instanceof ValidationException) {
            $response['error']['details'] = ['errors' => $e->errors()];
            $statusCode = 422;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Handle web exceptions with custom error views.
     */
    protected function handleWebException(Request $request, Throwable $e): Response
    {
        // Handle ModelNotFoundException
        if ($e instanceof ModelNotFoundException) {
            return $this->handleModelNotFoundException($request, $e);
        }

        // Handle AuthorizationException
        if ($e instanceof AuthorizationException) {
            return $this->handleAuthorizationException($request, $e);
        }

        // Handle ValidationException
        if ($e instanceof ValidationException) {
            $this->errorLogService->logValidationError($e, $request);

            return parent::render($request, $e);
        }

        // Handle TokenMismatchException (CSRF)
        if ($e instanceof TokenMismatchException) {
            return $this->handleTokenMismatchException($request, $e);
        }

        // Handle TooManyRequestsHttpException (Rate limiting)
        if ($e instanceof TooManyRequestsHttpException) {
            return $this->handleTooManyRequestsException($request, $e);
        }

        // Handle other HTTP exceptions
        if ($e instanceof HttpException) {
            return $this->handleHttpException($request, $e);
        }

        // Log other errors
        $this->errorLogService->logError($e, $this->getContext());

        // Let Laravel handle the rest
        return parent::render($request, $e);
    }

    /**
     * Handle ModelNotFoundException with a custom response.
     */
    protected function handleModelNotFoundException(Request $request, ModelNotFoundException $e): Response
    {
        $modelName = class_basename($e->getModel());

        $message = "The requested {$modelName} could not be found.";

        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'NOT_FOUND',
                    'message' => $message,
                ],
                'request_id' => $this->errorLogService->getRequestUuid(),
            ], 404);
        }

        // Log the error
        $this->errorLogService->logError($e, [
            'model' => $e->getModel(),
            'ids' => $e->getIds(),
        ]);

        return response()->view('errors.404', [
            'message' => $message,
            'request_id' => $this->errorLogService->getRequestUuid(),
        ], 404);
    }

    /**
     * Handle AuthorizationException with a custom response.
     */
    protected function handleAuthorizationException(Request $request, AuthorizationException $e): Response
    {
        $message = $e->getMessage() ?: 'You are not authorized to perform this action.';

        // Log authorization errors
        $this->errorLogService->logAuthorizationError($e, $request);

        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'FORBIDDEN',
                    'message' => $message,
                ],
                'request_id' => $this->errorLogService->getRequestUuid(),
            ], 403);
        }

        return response()->view('errors.403', [
            'message' => $message,
            'request_id' => $this->errorLogService->getRequestUuid(),
        ], 403);
    }

    /**
     * Handle TokenMismatchException (CSRF).
     */
    protected function handleTokenMismatchException(Request $request, TokenMismatchException $e): Response
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'SESSION_EXPIRED',
                    'message' => 'Your session has expired. Please refresh the page and try again.',
                ],
                'request_id' => $this->errorLogService->getRequestUuid(),
            ], 419);
        }

        return response()->view('errors.419', [
            'request_id' => $this->errorLogService->getRequestUuid(),
        ], 419);
    }

    /**
     * Handle TooManyRequestsHttpException (Rate limiting).
     */
    protected function handleTooManyRequestsException(Request $request, TooManyRequestsHttpException $e): Response
    {
        $retryAfter = $e->getHeaders()['Retry-After'] ?? 60;

        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => 'RATE_LIMITED',
                    'message' => 'Too many requests. Please try again later.',
                ],
                'retry_after' => $retryAfter,
                'request_id' => $this->errorLogService->getRequestUuid(),
            ], 429);
        }

        return response()->view('errors.429', [
            'retry_after' => $retryAfter,
            'request_id' => $this->errorLogService->getRequestUuid(),
        ], 429);
    }

    /**
     * Handle generic HTTP exceptions.
     */
    protected function handleHttpException(Request $request, HttpException $e): Response
    {
        $statusCode = $e->getStatusCode();

        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json([
                'success' => false,
                'error' => [
                    'code' => $this->getErrorCodeFromStatus($statusCode),
                    'message' => $e->getMessage() ?: $this->getHttpStatusMessage($statusCode),
                ],
                'request_id' => $this->errorLogService->getRequestUuid(),
            ], $statusCode);
        }

        // Map HTTP status codes to error views
        $viewMap = [
            403 => 'errors.403',
            404 => 'errors.404',
            419 => 'errors.419',
            429 => 'errors.429',
            500 => 'errors.500',
        ];

        $view = $viewMap[$statusCode] ?? 'errors.500';

        return response()->view($view, [
            'message' => $e->getMessage(),
            'status_code' => $statusCode,
            'request_id' => $this->errorLogService->getRequestUuid(),
        ], $statusCode);
    }

    /**
     * Get the HTTP status code from an exception.
     */
    protected function getStatusCode(Throwable $e): int
    {
        if ($e instanceof HttpException) {
            return $e->getStatusCode();
        }

        if ($e instanceof ValidationException) {
            return 422;
        }

        if ($e instanceof ModelNotFoundException) {
            return 404;
        }

        if ($e instanceof AuthorizationException) {
            return 403;
        }

        if ($e instanceof TokenMismatchException) {
            return 419;
        }

        if ($e instanceof TooManyRequestsHttpException) {
            return 429;
        }

        return 500;
    }

    /**
     * Get the exception message.
     */
    protected function getExceptionMessage(Throwable $e): string
    {
        if ($e instanceof ValidationException) {
            return 'Validation failed';
        }

        if ($e instanceof ModelNotFoundException) {
            $modelName = class_basename($e->getModel());

            return "The requested {$modelName} could not be found.";
        }

        if ($e instanceof AuthorizationException) {
            return $e->getMessage() ?: 'You are not authorized to perform this action.';
        }

        if ($e instanceof TokenMismatchException) {
            return 'Your session has expired. Please refresh the page and try again.';
        }

        if ($e instanceof TooManyRequestsHttpException) {
            return 'Too many requests. Please try again later.';
        }

        if ($e instanceof HttpException) {
            return $e->getMessage() ?: $this->getHttpStatusMessage($e->getStatusCode());
        }

        return config('app.debug') ? $e->getMessage() : 'An error occurred';
    }

    /**
     * Get the error code for an exception.
     */
    protected function getErrorCode(Throwable $e): string
    {
        if ($e instanceof ValidationException) {
            return 'VALIDATION_ERROR';
        }

        if ($e instanceof ModelNotFoundException) {
            return 'NOT_FOUND';
        }

        if ($e instanceof AuthorizationException) {
            return 'FORBIDDEN';
        }

        if ($e instanceof TokenMismatchException) {
            return 'SESSION_EXPIRED';
        }

        if ($e instanceof TooManyRequestsHttpException) {
            return 'RATE_LIMITED';
        }

        if ($e instanceof HttpException) {
            return $this->getErrorCodeFromStatus($e->getStatusCode());
        }

        return 'INTERNAL_ERROR';
    }

    /**
     * Get error code from HTTP status code.
     */
    protected function getErrorCodeFromStatus(int $statusCode): string
    {
        return match ($statusCode) {
            400 => 'BAD_REQUEST',
            401 => 'UNAUTHORIZED',
            403 => 'FORBIDDEN',
            404 => 'NOT_FOUND',
            405 => 'METHOD_NOT_ALLOWED',
            419 => 'SESSION_EXPIRED',
            422 => 'UNPROCESSABLE_ENTITY',
            429 => 'RATE_LIMITED',
            500 => 'INTERNAL_ERROR',
            502 => 'BAD_GATEWAY',
            503 => 'SERVICE_UNAVAILABLE',
            default => 'ERROR',
        };
    }

    /**
     * Get HTTP status message.
     */
    protected function getHttpStatusMessage(int $statusCode): string
    {
        return match ($statusCode) {
            400 => 'Bad Request',
            401 => 'Unauthorized',
            403 => 'Forbidden',
            404 => 'Page Not Found',
            405 => 'Method Not Allowed',
            419 => 'Page Expired',
            422 => 'Unprocessable Entity',
            429 => 'Too Many Requests',
            500 => 'Internal Server Error',
            502 => 'Bad Gateway',
            503 => 'Service Unavailable',
            default => 'Error',
        };
    }
}
