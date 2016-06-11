<?php

namespace SkysoulDesign\Payment;

use Illuminate\Support\ServiceProvider;
use SkysoulDesign\Payment\Contracts\PaymentGatewayContract;
use SkysoulDesign\Payment\Implementations\Alipay\Alipay;
use SkysoulDesign\Payment\Implementations\Unionpay\GatewayPay;
use SkysoulDesign\Payment\Implementations\UnionPay\UnionPay;

/**
 * Class PaymentServiceProvider
 *
 * @package SkysoulDesign\Payment
 */
class PaymentServiceProvider extends ServiceProvider
{

    /**
     * List of available drivers
     *
     * @var array
     */
    private $drivers = [
        'alipay' => Alipay::class,
        'unionpay' => UnionPay::class
    ];

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
        $this->app->bind(PaymentGatewayContract::class, function ($app, $model) {
            return (new Payment($this->drivers))->boot(...$model);
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
            Payment::class
        ];
    }
}