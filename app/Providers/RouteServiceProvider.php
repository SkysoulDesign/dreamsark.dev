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

        /**
         * Route Model Binding
         */
        $router->model('user', User::class);
        $router->model('setting', Setting::class);
        $router->model('idea', Idea::class);
        $router->model('submission', Submission::class);
        $router->model('project', Project::class);
        $router->model('expenditure', Expenditure::class);
        $router->model('enroller', Enroller::class);
        $router->model('draft', Draft::class);
        $router->model('vote', Vote::class);
        $router->model('cast', Cast::class);
        $router->model('crew', Crew::class);
        $router->model('review', Review::class);

    }

    /**
     * Define the routes for the application.
     *
     * @param  \Illuminate\Routing\Router $router
     * @return void
     */
    public function map(Router $router)
    {
        $router->group(['namespace' => $this->namespace], function ($router) {
            require app_path('Http/routes.php');
        });
    }
}
