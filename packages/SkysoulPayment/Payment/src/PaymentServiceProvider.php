<?php

namespace SkysoulDesign\Payment;


use DreamsArk\Http\Controllers\User\Bag\CoinController;
use Illuminate\Foundation\Application;
use Illuminate\Support\ServiceProvider;
use SkysoulDesign\Payment\Contracts\PaymentGatewayContract;
use SkysoulDesign\Payment\Implementations\Alipay\Alipay;
use SkysoulDesign\Payment\Implementations\Alipay\AlipayDirect;
use SkysoulDesign\Payment\Implementations\Unionpay\GatewayPay;

class PaymentServiceProvider extends ServiceProvider
{

    private $drivers = [
        'alipay' => Alipay::class,
        'unionpay' => GatewayPay::class
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
         * Tag Drivers
         */
//        $this->app->tag($this->drivers, 'payment.drivers');

        /**
         * Bind Contract
         */
        $this->app->singleton(PaymentGatewayContract::class, function ($app) {
            return new Payment($this->drivers);
        });

        $this->app->alias(
            PaymentGatewayContract::class, Payment::class
        );

        $this->app->alias(
            PaymentGatewayContract::class, 'payment'
        );

//
//        $this->app->bind('payment.drivers.alipay', Alipay::class);
//
//        $this->app->bind('ReportAggregator', function ($app) {
//            return new PaymentGateway($app->tagged('drivers'));
//        });


    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        dd(array_merge([PaymentGateway::class], $this->drivers));
    }
}