<?php

namespace SkysoulDesign\Payment\Implementations\Unionpay;

use SkysoulDesign\Payment\PaymentGateway;

/**
 * 
 */
class UnionpayLatest extends PaymentGateway
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
     * * Name of the invoice_no
     * @var string
     */
    public $uniqueInvoiceNoKey = 'queryId';

    /**
     * Returns any extra keyed params that should be sent within the request
     *
     * @param array $config
     * @return array
     */
    public function getAdditionalPostData(array $config) : array
    {
        return [
            'version'      => '5.0.0',
            'encoding'     => 'utf-8',
            'txnType'      => '01',
            'txnSubType'   => '01',
            'bizType'      => '000201',
            'signMethod'   => '01',
            'channelType'  => '07',
            'accessType'   => '0',
            'currencyCode' => '156',
            'txnTime'      => date('YmdHis'),
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
        $returnStr = '';
        $querySha = sha1($query, false);

        openssl_pkcs12_read($key, $certDara, $password);
        $sign = openssl_sign($querySha, $signature, $certDara['pkey'], OPENSSL_ALGO_SHA1);
        if ($sign)
            $returnStr = base64_encode($signature);

        return $returnStr;
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
        /**
         * do events to append certId
         */
        openssl_pkcs12_read($key, $certs, $password);
        $cert = $certs ['cert'];
        openssl_x509_read($cert);
        $certData = openssl_x509_parse($cert);
        $request['certId'] = $certData ['serialNumber'];

        return $request;

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
        $querySha = sha1($query, false);
        $isSuccess = openssl_verify($querySha, $signature, $key, OPENSSL_ALGO_SHA1);

        return $isSuccess;
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
    public function getPrice(int $amount, int $base) : init
    {
        return $amount / 10;
    }
}