<?php

namespace DreamsArk\Providers;

use DreamsArk\Http\ViewComposers\UserComposer;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

/**
 * Class ComposerServiceProvider
 *
 * @package DreamsArk\Providers
 */
class ComposerServiceProvider extends ServiceProvider
{
    /**
     * Register bindings in the container.
     *
     * @param Request $request
     */
    public function boot(Request $request)
    {

        /**
         * User ViewComposer
         */
        view()->composer(
            'user/*', UserComposer::class
        );

    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}