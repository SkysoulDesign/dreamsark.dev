<?php

namespace SkysoulDesign\Payment\Implementations\Wechat;


use SkysoulDesign\Payment\Contracts\SelfHandle;
use SkysoulDesign\Payment\PaymentGateway;

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
     * Returns any extra keyed params that should be sent within the request
     *
     * @return array
     */
    public function getAdditionalPostData() : array
    {
        // TODO: Implement getAdditionalPostData() method.
        return [
            "appid"            => config('payment.drivers.wechat.app_id'),
            "detail"           => "payment.description",
            "body"             => "payment.subject",
            'time_start'       => date('YmdHis'),
            'time_expire'      => date("YmdHis", time() + 600),
            'trade_type'       => 'NATIVE',
            'spbill_create_ip' => $_SERVER['REMOTE_ADDR'],
            'nonce_str'        => $this->getNonceStr(),

        ];
    }

    private function getNonceStr($length = 32)
    {
        $chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        $str = "";
        for ($i = 0; $i < $length; $i++) {
            $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
        }

        return $str;
    }

    /**
     * Gets Payment Confirmation response
     *
     * @return string
     */
    public function getConfirmationResponse() : string
    {
        // TODO: Implement getConfirmationResponse() method.
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
        // TODO: Implement sign() method.
        $string = $query . "&key=" . $key;//config('payment.drivers.wechat.private_key');
        $string = md5($string);

        return strtoupper($string);
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
        // TODO: Implement validate() method.
        $result = $this->parseRawRequest($key, true);

        return $result['result_code'] == 'SUCCESS' ? true : false;
    }

    public function parseRawRequest($key, $checkSign = false) : array
    {
        $xml = $GLOBALS['HTTP_RAW_POST_DATA']??file_get_contents("php://input");
        try {
            $result = $this->parseResponse($xml, $key, $checkSign);
        } catch (\Exception $e) {
            $result = false;
        }
        if ($result == false) {
            $array['result_code'] = "FAIL";
            $array['return_msg'] = '';
        } else {
            $array = $result;
        }

        return $array;
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
    public function getPrice(int $amount, int $base)
    {
        // TODO: Implement getPrice() method.
        return $amount / 10;
    }

    public function getUniqueNo(string $unique_no) : string
    {
        return substr($unique_no, 4, strlen($unique_no));
    }

    public function prepareData(array $data): string
    {
        // TODO: Implement prepareData() method.
        $xml = "<xml>";
        foreach ($data as $key => $val) {
            if (is_numeric($val))
                $xml .= "<" . $key . ">" . $val . "</" . $key . ">";
            else
                $xml .= "<" . $key . "><![CDATA[" . $val . "]]></" . $key . ">";
        }
        $xml .= "</xml>";

        return $xml;
    }

    public function parseResponse($response, $key, $checkSign = true): array
    {
        // TODO: Implement parseResponse() method.
        libxml_disable_entity_loader(true);

        $returnArr = json_decode(json_encode(simplexml_load_string($response, 'SimpleXMLElement', LIBXML_NOCDATA)), true);
        return $checkSign ? $this->checkSign($returnArr, $key) : $returnArr;
//        return json_decode(json_encode(simplexml_load_string($response, 'SimpleXMLElement', LIBXML_NOCDATA)), true);
    }

    private function checkSign(array $response, string $key) : array
    {
        $errorArr = ['result_code' => 'FAIL-INVALID-SIGN'];

        if (!isset($response['sign']))
            return $errorArr;

        $sign = $this->sign($this->queryString($response), $key);
        if ($response['sign'] == $sign) {
            return $response;
        }

        return $errorArr;
    }

    private function queryString(array $array)
    {
        ksort($array);
        /*unset($array['sign']);
        $array = array_filter($array, 'strlen');
        $query = http_build_query($array);

        return urldecode($query);*/
        $buff = "";
        foreach ($array as $k => $v) {
            if ($k != "sign" && $v != "" && !is_array($v)) {
                $buff .= $k . "=" . $v . "&";
            }
        }

        $buff = trim($buff, "&");

        return $buff;
    }
}