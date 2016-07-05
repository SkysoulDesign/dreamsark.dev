<?php

namespace SkysoulDesign\I18n;

use Illuminate\Support\ServiceProvider;
use SkysoulDesign\I18n\Repositories\TranslationRepository;
use SkysoulDesign\I18n\Repositories\TranslationRepositoryInterface;

/**
 * Class I18nServiceProvider
 *
 * @package SkysoulDesign\I18n
 */
class I18nServiceProvider extends ServiceProvider
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

}