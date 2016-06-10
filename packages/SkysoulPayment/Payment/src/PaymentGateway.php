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
     * @var PaymentBuilder
     */
    public $builder;
    /**
     * @var Transaction
     */
    private $transaction;
    /**
     * @var
     */
    private $driver;

    /**
     * PaymentGateway constructor.
     *
     * @param $driver
     */
    public function __construct($driver)
    {
        $this->driver = $driver;
    }

    /**
     * Build URL Query string
     *
     * @param array $data
     * @param bool $encoded
     * @return string
     */
    public function buildQueryString(array $data, bool $encoded = false) : string
    {
        $query = http_build_query($data);

        if ($encoded)
            return $query;

        return urldecode($query);
    }










    

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