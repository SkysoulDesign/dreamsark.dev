<?php

namespace DreamsArk\Http;

use DreamsArk\Http\Middleware\AjaxMiddleware;
use DreamsArk\Http\Middleware\Authenticate;
use DreamsArk\Http\Middleware\Authorize;
use DreamsArk\Http\Middleware\EncryptCookies;
use DreamsArk\Http\Middleware\Localization;
use DreamsArk\Http\Middleware\RedirectIfAuthenticated;
use DreamsArk\Http\Middleware\RoleMiddleware;
use Illuminate\Auth\Middleware\AuthenticateWithBasicAuth;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Foundation\Http\Kernel as HttpKernel;
use Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use SkysoulDesign\Payment\Middleware\TransactionMiddleware;

/**
 * Class Kernel
 *
 * @package DreamsArk\Http
 */
class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * @var array
     */
    protected $middleware = [
        CheckForMaintenanceMode::class,
        Localization::class,
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
            EncryptCookies::class,
            AddQueuedCookiesToResponse::class,
            StartSession::class,
            ShareErrorsFromSession::class,
//            VerifyCsrfToken::class,
        ],

        'api' => [
        ],

        'ajax' => [
            AjaxMiddleware::class,
        ],
    ];

    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => Authenticate::class,
        'auth.basic' => AuthenticateWithBasicAuth::class,
        'guest' => RedirectIfAuthenticated::class,
        'can' => Authorize::class,

        /**
         * Custom
         */
        'role' => RoleMiddleware::class,
        'transaction' => TransactionMiddleware::class,
    ];
}
