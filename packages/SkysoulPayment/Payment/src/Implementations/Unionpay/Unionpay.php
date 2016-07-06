<?php

namespace SkysoulDesign\Payment\Implementations\Unionpay;

use DreamsArk\Models\Payment\Transaction;
use SkysoulDesign\Payment\PaymentGateway;

/**
 * Class Unionpay
 *
 * @package SkysoulDesign\Payment\Implementations\Unionpay
 */
class Unionpay extends PaymentGateway
{

    /**
     * Callback key
     *
     * @var string
     */
    public $callbackKey = 'frontUrl';

    /**
     * Notify callback key
     *
     * @var string
     */
    public $notifyCallbackKey = 'backUrl';

    /**
     * Name of the unique key identifier on the gateway Api
     * Ex: out_trade_no for Alipay
     *
     * @var string
     */
    public $uniqueIdentifierKey = 'orderId';

    /**
     * Name of the sign key on the gateway API
     *
     * @var string
     */
    public $signKey = 'signature';

    /**
     * Key which identifies the amount payed for the product
     *
     * @var string
     */
    public $priceKey = 'txnAmt';

    /**
     * @var string
     */
    public $serviceIdKey = 'merId';

    /**
     * Returns any extra keyed params that should be sent within the request
     *
     * @param array $config
     * @return array
     */
    public function getAdditionalPostData(array $config) : array
    {
        return [
            'version' => '5.0.0',
            'encoding' => 'utf-8',
            'txnType' => '01',
            'txnSubType' => '01',
            'bizType' => '000201',
            'signMethod' => '01',
            'channelType' => '07',
            'accessType' => '0',
            'currencyCode' => '156',
            'txnTime' => date('YmdHis'),
        ];
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
     * Sign the request
     *
     * @param string $query
     * @param string $key
     * @param string $password
     * @return string
     */
    public function sign(string $query, string $key, string $password = null) : string
    {
        $sha = sha1($query, false);

        openssl_pkcs12_read($key, $cert, $password);
        openssl_sign($sha, $signature, $cert['pkey'], OPENSSL_ALGO_SHA1);

        return base64_encode($signature);
    }

    /**
     * Append Any necessary data before signing the request
     *
     * @param Transaction $transaction
     * @param array $request
     * @param string $key
     * @param string $password
     * @return array
     */
    public function appendDataToRequestBeforeSign(Transaction $transaction, array $request, string $key, string $password = null) : array
    {

        openssl_pkcs12_read($key, $cert, $password);
        $cert = $cert['cert'];

        openssl_x509_read($cert);
        $certData = openssl_x509_parse($cert);

        return [
            'certId' => $certData['serialNumber']
        ];
    }

    /**
     * Logic for validating the sign
     *
     * @param string $query
     * @param string $sign
     * @param string $key : public_key
     * @return bool
     */
    public function validate(string $query, string $sign, string $key) : bool
    {
        $signature = base64_decode($sign);
        $sha = sha1($query, false);
        return (bool)openssl_verify($sha, $signature, $key, OPENSSL_ALGO_SHA1);
    }

    /**
     * Should return the price that is sent to the API gateway
     * for example, some gateways might require the price
     * in cents and others in dollar.
     *
     * Attention to the return type, int != float
     * so it might have discrepancy on how the value is parsed on the gateway API
     *
     * @param int $amount
     * @param int $base
     * @return int|float
     */
    public function getPrice(int $amount, int $base) : int
    {
        return $amount / 10;
    }
}