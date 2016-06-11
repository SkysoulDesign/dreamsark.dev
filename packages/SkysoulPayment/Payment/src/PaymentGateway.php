<?php

namespace SkysoulDesign\Payment;

use SkysoulDesign\Payment\Contracts\PaymentGatewayContract;

/**
 * Class PaymentGateway
 *
 * @package SkysoulDesign\Payment
 */
abstract class PaymentGateway implements PaymentGatewayContract
{

    /**
     * Callback key
     *
     * @var string
     */
    public $callbackKey = 'return_url';

    /**
     * Notify callback key
     *
     * @var string
     */
    public $notifyCallbackKey = 'notify_url';

    /**
     * Name of the unique key identifier on the gateway Api
     * Ex: out_trade_no for Alipay
     *
     * @var string
     */
    public $uniqueIdentifierKey;

    /**
     * Name of the sign key on the gateway API
     *
     * @var string
     */
    public $signKey = 'sign';

    /**
     * Name of the type of signature defined by the gateway API
     *
     * @var string
     */
    public $signTypeKey = 'sign_type';

    /**
     * Key which identifies the amount payed for the product
     *
     * @var string
     */
    public $priceKey = 'total_fee';

    /**
     * get the service key name
     *
     * @var string
     */
    public $serviceIdKey = 'partner';

}