<?php

namespace SkysoulDesign\Payment;

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
class PaymentGateway
{

    /**
     * @var PaymentBuilder
     */
    public $builder;

    /**
     * PaymentGateway constructor.
     *
     * @param PaymentBuilder $builder
     */
    private function __construct(PaymentBuilder $builder)
    {

        $this->builder = $builder;
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