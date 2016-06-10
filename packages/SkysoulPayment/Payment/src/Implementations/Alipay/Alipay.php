<?php

namespace SkysoulDesign\Payment\Implementations\Alipay;


use DreamsArk\Models\Payment\Transaction;
use Exception;
use Log;
use SkysoulDesign\Payment\PaymentGateway;

class Alipay extends PaymentGateway
{

    const GATEWAY_URL = 'https://mapi.alipay.com/gateway.do?';
    const SIGN_TYPE = 'RSA';
    const SELLER_ID = '2088221979483694';
    const PRIVATE_KEY_PATH = '/var/www/dreamsark/packages/SkysoulPayment/Payment/src/Implementations/Key/Alipay/rsa_private_key.pem';
    const PUBLIC_KEY_PATH = '/var/www/dreamsark/packages/SkysoulPayment/Payment/src/Implementations/Key/Alipay/alipay_public_key.pem';

//    public $postCharset = "UTF-8";
//    protected $fileCharset = "UTF-8";
//    protected $RESPONSE_SUFFIX = "_response";
//    protected $ERROR_RESPONSE = "error_response";
//    protected $SIGN_NODE_NAME = "sign";

    /**
     * @var Transaction
     */
    private $transaction;

    /**
     * Alipay constructor.
     *
     * @param Transaction $transaction
     */
    public function __construct(Transaction $transaction)
    {
        $this->transaction = $transaction;
    }

    public function getPostData() : array
    {

        return [
            "out_trade_no" => $this->transaction->getAttribute('unique_no'),
            "total_fee" => '0.01',
            "_input_charset" => "utf-8",
            "service" => "create_direct_pay_by_user",
            "body" => "payment.description",
            "notify_url" => route('payment.alipay.notify'),
            "partner" => "2088221979483694",
            "seller_id" => "2088221979483694",
            "payment_type" => "1",
            "return_url" => route('payment.alipay.status'),
            "subject" => "payment.subject",
        ];
    }

    /**
     * @param array $data
     * @return mixed|string
     */
    public function sign(array $data) : string
    {
        /**
         * According with alipay Api the keys should
         * be ordered in ascending order
         */
        ksort($data);

        $data = $this->buildQueryString($data);

        $key = file_get_contents(static::PRIVATE_KEY_PATH);
        $response = openssl_get_privatekey($key);

        openssl_sign($data, $sign, $response);
        openssl_free_key($response);

        return base64_encode($sign);
    }

    /**
     * @param $data
     * @param $sign
     * @return bool
     */
    public function verify($data, $sign)
    {
        $pubKey = file_get_contents(static::PUBLIC_KEY_PATH);
        $res = openssl_get_publickey($pubKey);
        $result = (bool)openssl_verify($data, base64_decode($sign), $res);
        openssl_free_key($res);

        return $result;
    }


    protected $eventResponse;

    public $config = [
        'ali_public_key_path' => "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIgHnOn7LLILlKETd6BFRJ0GqgS2Y3mn1wMQmyh9zEyWlz5p1zrahRahbXAfCfSqshSNfqOmAQzSHRVjCqjsAw1jyqrXaPdKBmr90DIpIxmIyKXv4GGAkPyJ/6FTFY99uhpiq0qadD/uSzQsefWo0aTvP/65zi3eof7TcZ32oWpwIDAQAB",
        'private_key_path' => 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAKK0PXoLKnBkgtOl0kvyc9X2tUUdh/lRZr9RE1frjr2ZtAulZ+Moz9VJZFew1UZIzeK0478obY/DjHmD3GMfqJoTguVqJ2MEg+mJ8hJKWelvKLgfFBNliAw+/9O6Jah9Q3mRzCD8pABDEHY7BM54W7aLcuGpIIOa/qShO8dbXn+FAgMBAAECgYA8+nQ380taiDEIBZPFZv7G6AmT97doV3u8pDQttVjv8lUqMDm5RyhtdW4n91xXVR3ko4rfr9UwFkflmufUNp9HU9bHIVQS+HWLsPv9GypdTSNNp+nDn4JExUtAakJxZmGhCu/WjHIUzCoBCn6viernVC2L37NL1N4zrR73lSCk2QJBAPb/UOmtSx+PnA/mimqnFMMP3SX6cQmnynz9+63JlLjXD8rowRD2Z03U41Qfy+RED3yANZXCrE1V6vghYVmASYsCQQCoomZpeNxAKuUJZp+VaWi4WQeMW1KCK3aljaKLMZ57yb5Bsu+P3odyBk1AvYIPvdajAJiiikRdIDmi58dqfN0vAkEAjFX8LwjbCg+aaB5gvsA3t6ynxhBJcWb4UZQtD0zdRzhKLMuaBn05rKssjnuSaRuSgPaHe5OkOjx6yIiOuz98iQJAXIDpSMYhm5lsFiITPDScWzOLLnUR55HL/biaB1zqoODj2so7G2JoTiYiznamF9h9GuFC2TablbINq80U2NcxxQJBAMhw06Ha/U7qTjtAmr2qAuWSWvHU4ANu2h0RxYlKTpmWgO0f47jCOQhdC3T/RK7f38c7q8uPyi35eZ7S1e/PznY=',
        'public_key_path' => "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCitD16CypwZILTpdJL8nPV9rVFHYf5UWa/URNX6469mbQLpWfjKM/VSWRXsNVGSM3itOO/KG2Pw4x5g9xjH6iaE4LlaidjBIPpifISSlnpbyi4HxQTZYgMPv/TuiWofUN5kcwg/KQAQxB2OwTOeFu2i3LhqSCDmv6koTvHW15/hQIDAQAB",
        'alipayKeyPath' => '',
        'rsaPrivateKeyFilePath' => '',
        'rsaPublicKeyFilePath' => '',
        'charset' => "GBK",
        'gatewayUrl' => "https://openapi.alipay.com/gateway.do",
        'app_id' => "2088022177082393"
    ];

    protected $methodAndParams = [
        'pay' => [
            'method' => 'alipay.trade.pay',
            'param' => [
                'out_trade_no' => '', 'scene' => '', 'auth_code' => '', 'total_amount' => '', 'seller_id' => '',
                'subject' => '', 'body' => '',
            ],
            'response' => [
                'trade_no' => '', 'out_trade_no' => '', 'buyer_logon_id' => '', 'total_amount' => '', 'receipt_amount' => '',
                'gmt_payment' => '', 'fund_bill_list' => ['AMOUNT' => '', 'fund_channel' => ''],
                'buyer_user_id' => '', 'discount_goods_detail' => '',
            ]
        ],
        'qr' => [
            'method' => 'alipay.trade.precreate',
            'param' => [
                'out_trade_no' => '', 'total_amount' => '', 'seller_id' => '',
                'buyer_logon_id' => '', 'subject' => '', 'body' => '',
            ],
            'response' => [
                'out_trade_no' => '', 'qr_code' => '',
            ]
        ],
        'query' => [
            'method' => 'alipay.trade.query',
            'param' => [
                'out_trade_no' => '', 'trade_no' => '',
            ],
            'response' => [
                'trade_no' => '', 'out_trade_no' => '', 'buyer_logon_id' => '', 'total_amount' => '', 'receipt_amount' => '',
                'trade_status' => '', 'fund_bill_list' => ['AMOUNT' => '', 'fund_channel' => ''],
                'buyer_user_id' => '', 'discount_goods_detail' => '', 'send_pay_date' => '',
            ]
        ],
        'refund' => [
            'method' => 'alipay.trade.refund',
            'param' => [
                'trade_no' => '', 'out_trade_no' => '', 'refund_amount' => '', 'refund_reason' => '',
            ],
            'response' => [
                'trade_no' => '', 'out_trade_no' => '', 'buyer_logon_id' => '', 'open_id' => '',
                'fund_change' => '', 'refund_fee' => '', 'gmt_refund_pay' => '', 'buyer_user_id' => '', 'msg' => ''
            ]
        ],
        'cancel' => [
            'method' => 'alipay.trade.cancel',
            'param' => [
                'trade_no' => '', 'out_trade_no' => '', 'msg' => ''
            ],
            'response' => [
                'trade_no' => '', 'out_trade_no' => '', 'retry_flag' => '', 'action' => '', 'msg' => ''
            ]
        ],
    ];

    protected $publicRequestParam = [
        'app_id' => '', 'method' => '', 'charset' => '', 'sign_type' => 'RSA',
        'sign' => '', 'timestamp' => '', 'version' => '1.0', 'app_auth_token' => '',
        'notify_url' => '',
    ];

    protected $requestParams = [

    ];

    public function createQrCode($params)
    {
        $this->prepareRequestAndDoCurl($params, 'qr');
        dd($this->eventResponse);
    }

    public function doPayment($params)
    {
        $this->prepareRequestAndDoCurl($params, 'pay');
        dd($this->eventResponse);
    }

    public function queryOnPayment($params)
    {
        $this->prepareRequestAndDoCurl($params, 'query');
    }

    public function refundAmount($params)
    {
        $this->prepareRequestAndDoCurl($params, 'refund');
    }

    public function cancelPayment($params)
    {
        $this->prepareRequestAndDoCurl($params, 'cancel');
    }

    protected function prepareRequestArray($request, $method)
    {
        $requestArr = [];
        $requestParamArr = $this->get('publicRequestParam');
        $requestParamArr = array_merge($requestParamArr, $this->get('methodAndParams')[$method]['param']);

        $request['method'] = $this->get('methodAndParams')[$method]['method'];
        foreach ($requestParamArr as $key => $value) {
            $requestArr[$key] = isset($request[$key]) ? $request[$key] : $value;
        }
//        $request['sign'] = $this->sign($this->getSignContent($requestArr));

        return $requestArr;
    }


    protected function getSignContent($params)
    {
        ksort($params);

        $stringToBeSigned = "";
        $i = 0;
        foreach ($params as $k => $v) {
            if (false === $this->checkEmpty($v) && "@" != substr($v, 0, 1)) {
                $v = $this->characterSet($v, $this->get('postCharset'));
                if ($i == 0) {
                    $stringToBeSigned .= "$k" . "=" . "$v";
                } else {
                    $stringToBeSigned .= "&" . "$k" . "=" . "$v";
                }
                $i++;
            }
        }

        unset ($k, $v);
        return $stringToBeSigned;
    }

    protected function checkEmpty($value)
    {
        if (!isset($value))
            return true;
        if ($value === null)
            return true;
        if (trim($value) === "")
            return true;

        return false;
    }

    public function prepareRequestAndDoCurl($request, $method)
    {
        $response = $this > $this->triggerCurlEvent($this->prepareRequestArray($request, $method));

        return $response;
    }

    protected function triggerCurlEvent($requestArr)
    {
        $requestUrl = $this->get('config')['gatewayUrl'] . "?";
        foreach ($this->get('publicRequestParam') as $sysParamKey => $sysParamValue) {
            $requestUrl .= "$sysParamKey="
                . urlencode(
                    $this->characterSet(
                        (isset($requestArr[$sysParamKey]) ? $requestArr[$sysParamKey] : $sysParamValue), $this->get('postCharset')
                    )
                ) . "&";
            unset($requestArr[$sysParamKey]);
        }
        $requestUrl = substr($requestUrl, 0, -1);

        try {
            $response = $this->curl($requestUrl, $requestArr);
        } catch (Exception $e) {
            dd($e);
            $log = new Log(1, $e->getMessage());
//            $this->logCommunicationError($sysParams["method"], $requestUrl, "HTTP_ERROR_" . $e->getCode(), $e->getMessage());
            return false;
        }

        $this->eventResponse = $this->generateResponse($response);
    }

    protected function curl($url, $postFields = null)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FAILONERROR, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $postBodyString = "";
        $encodeArray = Array();
        $postMultipart = false;

        if (is_array($postFields) && 0 < count($postFields)) {
            foreach ($postFields as $k => $v) {
                if ("@" != substr($v, 0, 1)) {
                    $postBodyString .= "$k=" . urlencode($this->characterSet($v, $this->get('postCharset'))) . "&";
                    $encodeArray[$k] = $this->characterSet($v, $this->get('postCharset'));
                } else // multipart/form-data， www-form-urlencoded
                {
                    $postMultipart = true;
                    $encodeArray[$k] = new \CURLFile(substr($v, 1));
                }
            }
            unset ($k, $v);
            curl_setopt($ch, CURLOPT_POST, true);
            if ($postMultipart) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, $encodeArray);
            } else {
                curl_setopt($ch, CURLOPT_POSTFIELDS, substr($postBodyString, 0, -1));
            }
        }

        if ($postMultipart) {
            $headers = array('content-type: multipart/form-data;charset=' . $this->get('postCharset') . ';boundary=' . $this->getMillisecond());
        } else {
            $headers = array('content-type: application/x-www-form-urlencoded;charset=' . $this->get('postCharset'));
        }
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            throw new Exception(curl_error($ch), 0);
        } else {
            $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            if (200 !== $httpStatusCode) {
                throw new Exception($response, $httpStatusCode);
            }
        }
        curl_close($ch);

        return $response;
    }

    protected function getMillisecond()
    {
        list($s1, $s2) = explode(' ', microtime());

        return (float)sprintf('%.0f', (floatval($s1) + floatval($s2)) * 1000);
    }

    protected function characterSet($data, $targetCharset)
    {
        if (!empty($data)) {
            $fileType = $this->get('fileCharset');
            if (strcasecmp($fileType, $targetCharset) != 0) {
                $data = mb_convert_encoding($data, $targetCharset);
            }
        }

        return $data;
    }

    public function generateResponse($response)
    {
        //$response = iconv($this->get('postCharset'), $this->get('fileCharset') . "//IGNORE", $response);
        return json_decode($response, true);
    }

}