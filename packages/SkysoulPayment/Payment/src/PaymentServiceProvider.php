<?php

namespace SkysoulDesign\Payment;


use Illuminate\Foundation\Application;
use Illuminate\Support\ServiceProvider;

class PaymentServiceProvider extends ServiceProvider
{

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('payment', PaymentGateway::class,  function(Application $app){
            return $app->make(PaymentBuilder::class);
        });

    }
}