<?php

namespace SkysoulDesign\Payment\Implementations\Wechat;

use DreamsArk\Models\Payment\Transaction;
use SkysoulDesign\Payment\Contracts\SelfHandle;
use SkysoulDesign\Payment\PaymentGateway;

/**
 * Class Wechat
 *
 * @package SkysoulDesign\Payment\Implementations\Wechat
 */
class Wechat extends PaymentGateway implements SelfHandle
{

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
     * Key which identifies the amount payed for the product
     *
     * @var string
     */
    public $priceKey = 'total_fee';

    /**
     * Get the service key name
     *
     * @var string
     */
    public $serviceIdKey = 'mch_id';

    /**
     * Name of the invoice_no
     * Ex: trade_no for Alipay
     *
     * @var string
     */
    public $uniqueInvoiceNoKey = 'transaction_id';

    /**
     * Key of the error message in case of failure
     *
     * @var string
     */
    public $errorMessageKey = 'return_msg';

    /**
     * Returns any extra keyed params that should be sent within the request
     *
     * @param array $config
     * @return array
     */
    public function getAdditionalPostData(array $config) : array
    {
        return [
            "appid" => $config['app_id'],
            "detail" => "payment.description",
            "body" => "payment.subject",
            'time_start' => date('YmdHis'),
            'time_expire' => date("YmdHis", time() + 600),
            'trade_type' => 'NATIVE',
            'spbill_create_ip' => $_SERVER['REMOTE_ADDR']
        ];
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
        return [
            'nonce_str' => $transaction->getAttribute('unique_no')
        ];
    }

    /**
     * Determine if request has failed or not
     *
     * @param array $response
     * @return bool
     */
    public function checkFailure(array $response) : bool
    {
        return $response['return_code'] === 'FAIL';
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
        return strtoupper(
            md5("$query&key=$key")
        );
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
        parse_str($query, $response);
        return $response['result_code'] == 'SUCCESS';
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

    /**
     * Prepare data to be post to gateway API
     *
     * @param array $data
     * @return string
     */
    public function prepareData(array $data) : string
    {
        $xml = "<xml>";
        foreach ($data as $key => $val) {
            if (is_numeric($val))
                $xml .= "<$key>$val</$key>";
            else
                $xml .= "<$key><![CDATA[$val]]></$key>";
        }
        $xml .= "</xml>";

        return $xml;
    }

    /**
     * Parse Response Received from Vendor API
     *
     * @param string $response
     * @return array
     */
    static function parseResponse(string $response) : array
    {
        /**
         * This function prevents a vulnerable to Local and Remote File Inclusion attacks.
         */
        libxml_disable_entity_loader(true);

        return (array)simplexml_load_string($response, 'SimpleXMLElement', LIBXML_NOCDATA);
    }

    /**
     * Check Signature of Response Data
     *
     * @param array $response
     * @param string $sign
     * @return bool
     */
    public function checkSign(array $response, string $sign) : bool
    {
        return $response['sign'] === $sign;
    }
}