<?php

namespace DreamsArk\Providers;

use DreamsArk\Models\User\User;
use DreamsArk\Policies\UserPolicy;
use DreamsArk\Services\Gate;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

/**
 * Class AuthServiceProvider
 *
 * @package DreamsArk\Providers
 */
class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        User::class => UserPolicy::class
    ];

    /**
     * Register any application authentication / authorization services.
     *
     * @param  \Illuminate\Contracts\Auth\Access\Gate $gate
     * @return void
     */
    public function boot(GateContract $gate)
    {
        $this->registerPolicies($gate);
    }

    /**
     * Register Custom Gate
     */
    public function register()
    {
        $this->app->singleton(\Illuminate\Contracts\Auth\Access\Gate::class, function ($app) {
            return new Gate($app, function () use ($app) {
                return $app['auth']->user();
            });
        });
    }

}
