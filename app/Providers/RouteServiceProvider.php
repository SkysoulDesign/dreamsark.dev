<?php

namespace DreamsArk\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Routing\Router;

/**
 * Class RouteServiceProvider
 *
 * @package DreamsArk\Providers
 */
class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to the controller routes in your routes file.
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'DreamsArk\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @param  \Illuminate\Routing\Router $router
     * @return void
     */
    public function boot(Router $router)
    {
        parent::boot($router);
    }

    /**
     * Define the routes for the application.
     *
     * @param  \Illuminate\Routing\Router $router
     * @param Request $request
     */
    public function map(Router $router, Request $request)
    {

        /**
         * Generates Api or Web Routes
         */
        $route = $request->wantsJson() ? 'api' : 'web';

        /**
         * Web Router
         */
        $router->group([], function ($app) use ($route) {

            require app_path("Http/routes.$route.php");

            if ($route == 'web')
                require app_path("Http/routes.ajax.php");

        });

    }

}
