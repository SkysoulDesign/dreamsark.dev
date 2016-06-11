<?php

namespace SkysoulDesign\Payment;

use DreamsArk\Models\Payment\Transaction;
use SkysoulDesign\Payment\Contracts\PaymentGatewayContract;
use SkysoulDesign\Payment\Exceptions\DriverNotFoundException;
use SkysoulDesign\Payment\Implementations\Alipay\AlipayDirect;
use SkysoulDesign\Payment\Implementations\Alipay\AlipayNotify;
use SkysoulDesign\Payment\Implementations\Unionpay\GatewayPay;
use SkysoulDesign\Payment\Implementations\Unionpay\UPNotify;
use SkysoulDesign\Payment\Implementations\Wechat\WechatDirect;

/**
 * Class PaymentGateway
 *
 * @package SkysoulDesign\Payment
 */
abstract class PaymentGateway implements PaymentGatewayContract
{

    /**
     * Callback url given to the gateway website
     * You can pass an concrete URL or an Route Name
     * Correct value: ['return_url' => 'route_name' or 'http://concrete_url.com']
     *
     * @var array
     */
    public $callback = [];

    /**
     * Callback url
     *
     * @var array
     */
    public $notify_callback = [];

    /**
     * Name of the unique key identifier on the gateway Api
     * Ex: out_trade_no for Alipay
     *
     * @var string
     */
    public $uniqueIdentifierKey;

    /**
     * Name of the sign key on the gateway Api
     *
     * @var string
     */
    public $signKey = 'sign';


//    /**
//     * @var PaymentBuilder
//     */
//    public $builder;
//    /**
//     * @var Transaction
//     */
//    private $transaction;
//    /**
//     * @var
//     */
//    private $driver;
//
//    /**
//     * PaymentGateway constructor.
//     *
//     * @param $driver
//     */
//    public function __construct($driver)
//    {
//        $this->driver = $driver;
//    }


    /**
     * @param Transaction $transaction
     * @return string
     * @throws DriverNotFoundException
     */
    public function init(Transaction $transaction)
    {

        $driver = $transaction->getAttribute('method');


        if (!in_array($driver, config('payment.drivers'))) {
            throw new DriverNotFoundException("There is no driver available with the name of $driver.");
        }

        return app("payment.drivers.$driver");

    }

    public static function alipayDirect()
    {
        return new static(new AlipayDirect);
    }

    public static function alipayNotify()
    {
        return new static(new AlipayNotify);
    }

    public static function wechatDirect()
    {
        return new static(new WechatDirect);
    }

    public static function unionPayInstant()
    {
        return new static(new GatewayPay);
    }

    public static function unionPayNotify()
    {
        return new static(new UPNotify);
    }

    public function __call($name, $arguments)
    {
        if (method_exists($this->builder, $name))
            return $this->builder->$name(isset($arguments[0]) ? $arguments[0] : '');

    }

    public function get($property, $default = null)
    {
        if (property_exists($this->builder, $property)) {
            return $this->builder->$property;
        }

        return $default;
    }

}