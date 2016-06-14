<?php

namespace SkysoulDesign\Payment\Implementations\Wechat;


use SkysoulDesign\Payment\PaymentGateway;

class Wechat extends PaymentGateway
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
     * Returns any extra keyed params that should be sent within the request
     *
     * @return array
     */
    public function getAdditionalPostData() : array
    {
        // TODO: Implement getAdditionalPostData() method.
        return [
            "timeout"          => 30,
            "secret"           => config('payment.drivers.wechat.secret'),
            "appid"            => config('payment.drivers.wechat.app_id'),
            "key"              => config('payment.drivers.wechat.key'),
            "detail"           => "payment.description",
            "payment_type"     => "",
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
        $string = $query . "&key=" . config('payment.drivers.wechat.key');
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
    }

    public function getUniqueNo(string $unique_no) : string
    {
        return substr($unique_no, 4, strlen($unique_no));
    }
}