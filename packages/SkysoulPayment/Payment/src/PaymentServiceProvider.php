<?php

namespace SkysoulDesign\Payment;

use Illuminate\Support\ServiceProvider;
use SkysoulDesign\Payment\Contracts\PaymentGatewayContract;
use SkysoulDesign\Payment\Implementations\Alipay\Alipay;
use SkysoulDesign\Payment\Implementations\Unionpay\UnionPay;
use SkysoulDesign\Payment\Implementations\Wechat\Wechat;

/**
 * Class PaymentServiceProvider
 *
 * @package SkysoulDesign\Payment
 */
class PaymentServiceProvider extends ServiceProvider
{

    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = true;

    /**
     * List of available drivers
     *
     * @var array
     */
    private $drivers = [
        'wechat' => Wechat::class,
        'alipay' => Alipay::class,
        'unionPay' => UnionPay::class,
    ];

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        /**
         * Bind Drivers
         */
        $this->app->singleton('payment.drivers', function () {
            return array_map(function ($driver) {
                return new $driver;
            }, $this->drivers);
        });

        /**
         * Bind Contract
         */
        $this->app->bind(PaymentGatewayContract::class, function ($app, $model) {
            return (new Payment($app['payment.drivers']))->boot(...$model);
        });

        $this->app->alias(
            PaymentGatewayContract::class, Payment::class
        );

        $this->app->alias(
            PaymentGatewayContract::class, 'payment'
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
            PaymentGatewayContract::class,
            Payment::class,
            'payment',
            'payment.drivers'
        ];
    }
}
