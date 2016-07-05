<?php

namespace SkysoulDesign\Payment\Implementations\Wechat;


use SkysoulDesign\Payment\PaymentBuilder;

/**
 * Class WechatDirect
 *
 * @package SkysoulDesign\Payment\Implementations\Wechat
 */
class WechatDirect extends PaymentBuilder
{

    public function __construct()
    {
    }

    /**
     * @param $params
     * @return string
     */
    public function doPaymentForm($params)
    {
        return '';
    }

}