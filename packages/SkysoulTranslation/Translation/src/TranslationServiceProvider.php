<?php

namespace SkysoulDesign\Translation;

use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;
use SkysoulDesign\Translation\Http\Controllers\TranslationController;
use SkysoulDesign\Translation\Repositories\TranslationRepository;
use SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface;

/**
 * Class TranslationServiceProvider
 *
 * @package SkysoulDesign\Translation
 */
class TranslationServiceProvider extends ServiceProvider
{
    /**
     *
     */
    public function register()
    {
        /**
         * Translation Repository
         */
        $this->app->bind(
            TranslationRepositoryInterface::class,
            TranslationRepository::class
        );

    }

    /**
     * Bootstrap the application events.
     *
     * @param  \Illuminate\Routing\Router $router
     * @return void
     */
    public function boot(Router $router)
    {
        /**
         * Register Views
         */
        $this->loadViewsFrom(
            __DIR__ . '/resources/views', 'translation'
        );

        /**
         * Register Routes
         */
        $this->registerRoutes($router);

        /**
         * Publish Migrations
         */
        $this->publishes([
            __DIR__ . '/database/migrations' => database_path('migrations'),
        ]);

        /**
         * Publish Assets
         */
        $this->publishes([
            __DIR__ . '/resources/assets/translation-assets' => public_path('translation-assets'),
        ]);

    }

    /**
     * @param \Illuminate\Routing\Router $router
     */
    private function registerRoutes(Router $router)
    {

        $router->group(['prefix' => 'translation', 'as' => 'translation.'], function () use ($router) {
            $router->get('import', TranslationController::class . '@import')->name('import');
            $router->get('export', TranslationController::class . '@export')->name('export');
            $router->get('sync', TranslationController::class . '@sync')->name('sync');
            $router->post('language/store', TranslationController::class . '@newLanguage')->name('newLanguage');
            $router->post('group/store', TranslationController::class . '@newGroup')->name('newGroup');
            $router->post('translation/store', TranslationController::class . '@newTranslation')->name('newTranslation');
            $router->post('update/{translation}', TranslationController::class . '@update')->name('update');
            $router->get('scanForKeys', TranslationController::class . '@scanKeysAndImport')->name('scan-keys');
        });

        $router->get('translation/{language?}/{group?}', TranslationController::class . '@index')->name('translation');
    }

}
