<?php

namespace SkysoulDesign\Payment\Implementations\Unionpay;

/**
 * Class UPNotify
 *
 * @package SkysoulDesign\Payment\Implementations\Unionpay
 */
class UPNotify extends UPHelper
{
    /**
     * @var array
     */
    protected $config;

    /**
     * UPNotify constructor.
     */
    public function __construct()
    {
        $this->config = $this->getUnionpayConfig();
    }

    public function validate($params) {
        return $this->verify($params);
    }

}