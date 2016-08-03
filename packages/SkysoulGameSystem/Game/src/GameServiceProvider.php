<?php

namespace SkysoulDesign\Game;

use Illuminate\Support\ServiceProvider;

/**
 * Class GameServiceProvider
 *
 * @package SkysoulGameSystem\Game
 */
class GameServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = true;

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        /**
         * Bind Contract
         */
        $this->app->singleton(Game::class, function ($app) {
            return new Game();
        });
    }

    /**
     * @return array
     */
    public function provides()
    {
        return [
            Game::class
        ];
    }
}
