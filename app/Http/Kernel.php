<?php

namespace DreamsArk\Http;

use DreamsArk\Http\Middleware\AjaxMiddleware;
use DreamsArk\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * @var array
     */
    protected $middleware = [
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \DreamsArk\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
//        \DreamsArk\Http\Middleware\VerifyCsrfToken::class,
        \DreamsArk\Http\Middleware\Localization::class
    ];

    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth'       => \DreamsArk\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'guest'      => \DreamsArk\Http\Middleware\RedirectIfAuthenticated::class,
        /**
         * Custom
         */
        'role'       => RoleMiddleware::class,
        'ajax'       => AjaxMiddleware::class,
    ];
}
