<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Payment Drivers
    |--------------------------------------------------------------------------
    |
    | By default, database results will be returned as instances of the PHP
    | stdClass object; however, you may desire to retrieve records in an
    | array format for simplicity. Here you can tweak the fetch style.
    |
    */

//    'drivers' => explode(',', env('PAYMENT_DRIVERS', 'alipay')),

    'drivers' => [
        'alipay' => [
            'enabled' => true,
            'gateway_url' => 'https://mapi.alipay.com/gateway.do',
            'seller_id' => '2088221979483694',
            'private_key' => '/var/www/dreamsark/packages/SkysoulPayment/Payment/src/Implementations/Key/Alipay/rsa_private_key.pem',
            'sign_type' => 'RSA',
            'callback' => ''

        ],
        'unionpay' => [
            'enabled' => true,
            'seller_id' => '2088221979483694'
        ],
        'wechat' => [
            'enabled' => true,
            'seller_id' => '2088221979483694'
        ]
    ]

];