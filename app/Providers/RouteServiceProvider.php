<?php

namespace DreamsArk\Providers;

use DreamsArk\Models\Master\Profile;
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
     * Define your route model bindings, pattern filters, etc.
     *
     * @param  \Illuminate\Routing\Router $router
     * @return void
     */
    public function boot(Router $router)
    {

        parent::boot($router);

        $router->model('profile', Profile::class, function ($name) {
            if (is_string($name))
                return app(Profile::class)->whereName($name)->first();
        });

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
//        $route = $request->wantsJson() ? 'api' : 'web';

        $this->loadRoutesFrom(app_path('Http/routes.web.php'));
        $this->loadRoutesFrom(app_path('Http/Routes/project.web.php'));
        $this->loadRoutesFrom(app_path('Http/Routes/user.web.php'));
        $this->loadRoutesFrom(app_path('Http/routes.api.php'));

        /**
         * Web Router
         */
//        $router->group([], function ($app) {


//            require app_path("");
//            require app_path("");
//
//            /*
//             * Wait until laravel 5.3 to handle this messy part so for now if web also include api so
//             * one can reference one another
//             */
//            require app_path("");
//
//        });

    }
}
