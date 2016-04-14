<?php

namespace DreamsArk\Providers;

use DreamsArk\Models\Project\Expenditures\Cast;
use DreamsArk\Models\Project\Expenditures\Crew;
use DreamsArk\Models\Project\Expenditures\Enroller;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Draft;
use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\Project\Stages\Review;
use DreamsArk\Models\Project\Stages\Vote;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Models\User\Setting;
use DreamsArk\Models\User\User;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Routing\Router;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to the controller routes in your routes file.
     *
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
     * @return void
     */
    public function map(Router $router)
    {
        // 'namespace' => $this->namespace
        $router->group([], function ($app) {
            require app_path('Http/routes.php');
        });
    }
}
