<?php

namespace SkysoulDesign\SMS\Implementations;

use SkysoulDesign\SMS\SMSAbstract;

/**
 * Class Alipay
 *
 * @package SkysoulDesign\Payment\Implementations\Alipay
 */
class TencentCloud extends SMSAbstract
{

    public $phoneFormat = 'array';
    public $messageKey = 'msg';
    public $countryCodeKey = 'nationcode';

    public $url = 'https://yun.tim.qq.com/v3/tlssmssvr/sendsms?sdkappid={app_id}&random={random}';

    /**
     * Sign the request
     *
     * @param string $phone
     * @return string
     */
    public function sign(string $phone) : string
    {
        return md5($this->appSecret() . $phone);
    }

    public function appId()
    {
        return env('QCLOUD_APP_ID');
    }

    public function appSecret()
    {
        return env('QCLOUD_APP_SECRET');
    }

    public function random()
    {
        return rand(10000000,99999999);
    }

}
