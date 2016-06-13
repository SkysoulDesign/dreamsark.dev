<?php

namespace SkysoulDesign\Payment\Implementations\Alipay;

use SkysoulDesign\Payment\PaymentGateway;

/**
 * Class Alipay
 *
 * @package SkysoulDesign\Payment\Implementations\Alipay
 */
class Alipay extends PaymentGateway
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
    public $uniqueIdentifierKey = 'out_trade_no';

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
     * @var string
     */
    public $serviceIdKey = 'partner';

    /**
     * Returns any extra keyed params that should be sent within the request
     *
     * @return array
     */
    public function getAdditionalPostData() : array
    {
        return [
            "service"        => "create_direct_pay_by_user",
            "seller_id"      => "2088221979483694",
            "_input_charset" => "utf-8",
            "body"           => "payment.description",
            "payment_type"   => "1",
            "subject"        => "payment.subject",
        ];
    }

    /**
     * Logic for validating the sign
     *
     * @param string $query
     * @param string $sign
     * @param string $key
     * @return bool
     */
    public function validate(string $query, string $sign, string $key) : bool
    {
        /**
         * Am not sure but i think this method is unnecessary, need to check
         * if all other gateways will implement this similar or pretty much the same..
         */
        $res = openssl_get_publickey($key);
        $result = openssl_verify($query, base64_decode($sign), $res);
        openssl_free_key($res);

        return (bool)$result;
    }

    /**
     * Gets Payment Confirmation response
     *
     * @return string
     */
    public function getConfirmationResponse() : string
    {
        return 'success';
    }

    /**
     * Should return the price that is sent to the API gateway
     * for example, some gateways might require the price
     * in cents and others in dollar.
     * Attention to the return type, int != float
     * so it might have discrepancy on how the value is parsed on the gateway API
     *
     * @param int $amount
     * @param int $base
     * @return int|float
     */
    public function getPrice(int $amount, int $base) : float
    {
        return $amount / $base;
    }

    /**
     * Prepare the data to be sign
     *
     * @param array $request
     * @param string $key
     * @param string $password
     * @return array
     */
    public function prepare(array $request, string $key, string $password = null) : array
    {
        return $request;
    }

    /**
     * Sign the request
     *
     * @param string $query
     * @param string $key
     * @param string $password
     * @return string
     * @internal param string $pas
     */
    public function sign(string $query, string $key, string $password = null) : string
    {
        $response = openssl_get_privatekey($key);

        openssl_sign($query, $sign, $response);
        openssl_free_key($response);

        return base64_encode($sign);
    }
}