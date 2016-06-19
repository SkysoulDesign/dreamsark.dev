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
    public $callbackKey;

    /**
     * Notify callback key
     *
     * @var string
     */
    public $notifyCallbackKey;

    /**
     * Name of the unique key identifier on the gateway Api
     * Ex: out_trade_no for Alipay
     *
     * @var string
     */
    public $uniqueIdentifierKey;

    /**
     * Name of the invoice_no
     * Ex: trade_no for Alipay
     *
     * @var string
     */
    public $uniqueInvoiceNoKey;

    /**
     * Name of the sign key on the gateway API
     *
     * @var string
     */
    public $signKey;

    /**
     * Name of the type of signature defined by the gateway API
     *
     * @var string
     */
    public $signTypeKey;

    /**
     * Key which identifies the amount payed for the product
     *
     * @var string
     */
    public $priceKey;

    /**
     * get the service key name
     *
     * @var string
     */
    public $serviceIdKey;

    /**
     * Append Any necessary data before signing the request
     *
     * @param array $request
     * @param string $key
     * @param string $password
     * @return array
     */
    public function appendDataToRequestBeforeSign(array $request, string $key, string $password = null) : array
    {
        return [];
    }

    public function getUniqueNo(string $unique_no) : string
    {
        return $unique_no;
    }

    public function getUniqueNoWithPrefix(string $unique_no) : string
    {
        $payPrefix = config('payment.transaction_prefix.pay');
        if (strtolower(substr($unique_no, 0, 4)) != strtolower($payPrefix))
            $unique_no = config('payment.transaction_prefix.pay') . $unique_no;

        return $unique_no;
    }

}