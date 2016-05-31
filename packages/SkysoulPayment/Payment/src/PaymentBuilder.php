<?php

namespace SkysoulDesign\Payment;


use DreamsArk\Jobs\Payment\UpdateTransactionMessageJob;
use SkysoulDesign\Payment\Implementations\Unionpay\PhpLog;

/**
 * Class PaymentBuilder
 *
 * @package SkysoulDesign\Payment
 */
abstract class PaymentBuilder
{

    protected function getAlipayConfig()
    {

        $keyPath = dirname(__FILE__) . '/Implementations/Key/Alipay/';

        return [
            'gatewayUrl'          => "https://mapi.alipay.com/gateway.do?",
            'partner'             => config('defaults.payment_credentials.alipay.partner_id'),
            'seller_id'           => config('defaults.payment_credentials.alipay.partner_id'),
            'private_key_path'    => $keyPath . 'rsa_private_key.pem',
            'ali_public_key_path' => $keyPath . 'alipay_public_key.pem',
            'notify_url'          => route('payment.alipay.notify'),
            'return_url'          => route('payment.alipay.status'),
            'sign_type'           => strtoupper('RSA'),
            'input_charset'       => strtolower("utf-8"),
            'cacert'              => $keyPath . 'cacert.pem',
            'transport'           => "http",
            'payment_type'        => "1",
            'service'             => "create_direct_pay_by_user",
            'anti_phishing_key'   => "",
            'exter_invoke_ip'     => "",
        ];
    }

    protected function getUnionpayConfig()
    {
        $keyPath = dirname(__FILE__) . '/Implementations/Key/Unionpay/';

        define('UP_GATEWAY_IP', 'https://101.231.204.80');
        define('UP_COMMON_PORT', '5000');
        define('UP_FILE_PORT', '9080');

//        define('SDK_SIGN_CERT_PATH', $keyPath.'acp_test_sign.pfx');
        define('SDK_SIGN_CERT_PATH', $keyPath.'700000000000001_acp.pfx');
        define('SDK_SIGN_CERT_PWD', '000000');
//        define('SDK_ENCRYPT_CERT_PATH', $keyPath.'acp_test_enc.cer');
        define('SDK_ENCRYPT_CERT_PATH', $keyPath.'verify_sign_acp.cer');
        define('SDK_VERIFY_CERT_DIR', $keyPath);
        define('SDK_FRONT_TRANS_URL', UP_GATEWAY_IP . ':' . UP_COMMON_PORT . '/gateway/api/frontTransReq.do');
        define('SDK_BACK_TRANS_URL', UP_GATEWAY_IP . ':' . UP_COMMON_PORT . '/gateway/api/backTransReq.do');
        define('SDK_BATCH_TRANS_URL', UP_GATEWAY_IP . ':' . UP_COMMON_PORT . '/gateway/api/batchTrans.do');
        define('SDK_SINGLE_QUERY_URL', UP_GATEWAY_IP . ':' . UP_COMMON_PORT . '/gateway/api/queryTrans.do');
        define('SDK_FILE_QUERY_URL', UP_GATEWAY_IP . ':' . UP_FILE_PORT . '/');
        define('SDK_Card_Request_Url', UP_GATEWAY_IP . ':' . UP_COMMON_PORT . '/gateway/api/cardTransReq.do');
        define('SDK_App_Request_Url', UP_GATEWAY_IP . ':' . UP_COMMON_PORT . '/gateway/api/appTransReq.do');
        define('SDK_FILE_DOWN_PATH', public_path().'/payments/unionpay/file/');
        define('SDK_LOG_FILE_PATH', public_path().'/payments/unionpay/logs/');
        define('SDK_LOG_LEVEL', PhpLog::DEBUG);


        /** 以下缴费产品使用，其余产品用不到，无视即可 */
        define('JF_SDK_FRONT_TRANS_URL', UP_GATEWAY_IP . ':' . UP_COMMON_PORT . '/jiaofei/api/frontTransReq.do');
        define('JF_SDK_BACK_TRANS_URL', UP_GATEWAY_IP . ':' . UP_COMMON_PORT . '/jiaofei/api/backTransReq.do');
        define('JF_SDK_SINGLE_QUERY_URL', UP_GATEWAY_IP . ':' . UP_COMMON_PORT . '/jiaofei/api/queryTrans.do');
        define('JF_SDK_CARD_TRANS_URL', UP_GATEWAY_IP . ':' . UP_COMMON_PORT . '/jiaofei/api/cardTransReq.do');
        define('JF_SDK_APP_TRANS_URL', UP_GATEWAY_IP . ':' . UP_COMMON_PORT . '/jiaofei/api/appTransReq.do');
        define('SDK_FRONT_NOTIFY_URL', route('payment.unionpay.status'));
        define('SDK_BACK_NOTIFY_URL', route('payment.unionpay.notify'));

        return [
            'version'      => '5.0.0',
            'encoding'     => 'utf-8',
            'txnType'      => '01',
            'txnSubType'   => '01',
            'bizType'      => '000201',
            'frontUrl'     => SDK_FRONT_NOTIFY_URL,
            'backUrl'      => SDK_BACK_NOTIFY_URL,
            'signMethod'   => '01',
            'channelType'  => '08',
            'accessType'   => '0',
            'currencyCode' => '156',
            'merId'        => config('defaults.payment_credentials.unionpay.partner_id'),
        ];
    }

    /**
     * @param $property
     * @param null $default
     * @return null
     */
    protected function getProp($property, $default = null)
    {
        if (property_exists($this, $property)) {
            return $this->$property;
        }

        return $default;
    }

    public function updateTransactionMessage($transaction_id, $messageArr)
    {
        dispatch(new UpdateTransactionMessageJob($transaction_id, $messageArr));
    }

    /** Common Methods for Payment Gateways */
    /** Common for Alipay & Unionpay
     * ($sort, $encode) are used in Unionpay
     * @param $para
     * @param $sort
     * @param $encode
     * @return string
     */
    protected function createLinkString($para, $sort = false, $encode = false)
    {
        $arg = "";
        if ($sort)
            $para = $this->argSort($para);

        while (list ($key, $val) = each($para)) {
            if ($encode)
                $val = urlencode($val);
            $arg .= $key . "=" . $val . "&";
        }
        $arg = substr($arg, 0, count($arg) - 2);
        if (get_magic_quotes_gpc()) {
            $arg = stripslashes($arg);
        }

        return $arg;
    }

    /**
     * @param $para
     * @return mixed
     */
    protected function argSort($para)
    {
        ksort($para);
        reset($para);

        return $para;
    }

}