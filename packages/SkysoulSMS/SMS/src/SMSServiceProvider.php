<?php

namespace SkysoulDesign\SMS;

use GuzzleHttp\Client;
use Illuminate\Support\ServiceProvider;
use SkysoulDesign\SMS\Implementations\TencentCloud;
use SkysoulDesign\SMS\Interfaces\SMSInterface;

/**
 * Class SMSServiceProvider
 *
 * @package SkysoulDesign\SMS
 */
class SMSServiceProvider extends ServiceProvider
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
         * Bing TencentCloud
         */
        $this->app->bind(SMSInterface::class, TencentCloud::class);

        /**
         * Bind Contract
         */
        $this->app->singleton(SMS::class, function ($app) {
            return new SMS($app['sms.driver'], new Client());
        });

        $this->app->alias(
            SMS::class, 'sms'
        );

        $this->app->alias(
            SMSInterface::class, 'sms.driver'
        );

    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [
            'sms',
            'sms.driver',
            SMS::class,
            SMSInterface::class
        ];
    }
}
