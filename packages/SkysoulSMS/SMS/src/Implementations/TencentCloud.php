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

    /**
     * Application Key
     *
     * @var string
     */
    public $appKey = 'dffdfd6029698a5fdf4';

    public $phoneFormat = 'array';
    public $messageKey = 'msg';
    public $countryCodeKey = 'nationcode';

    public $url = 'https://yun.tim.qq.com/v3/tlssmssvr/sendsms?sdkappid={app_id}&random={random}&hello={idontknow}';

    /**
     * Sign the request
     *
     * @param string $key
     * @param array  $data
     *
     * @return string
     *
     */
    public function sign(string $key, array $data) : string
    {
        return md5($key . $data['phone']);
    }

    public function appId()
    {
        return 'im AppId';
    }

    public function random()
    {
        return 'hello world';
    }

    public function idontknow()
    {
        return '123';
    }

}
