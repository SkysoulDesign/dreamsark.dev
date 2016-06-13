<?php

return [

    /**
     * defines the currency case to be stored into the database
     */
    'base' => 1000,

    /**
     * Defines the routes or url to be called once the gateway API pings back the server
     */
    'callback_url' => 'payment.callback',
    'notify_callback_url' => 'payment.notify_callback',

    'transaction_prefix' => [
        'pay' => 'DAPG',
        'withdraw' => 'DAWG'
    ],

    'drivers' => [

        /**
         * Alipay defaults and credentials
         */
        'alipay' => [
            'enabled' => true,
            'gateway_url' => 'https://mapi.alipay.com/gateway.do',
            'service_id' => '2088221979483694',
            'private_key_path' => '/var/www/dreamsark/packages/SkysoulPayment/Payment/src/Implementations/Key/Alipay/rsa_private_key.pem',
            'public_key_path' => '/var/www/dreamsark/packages/SkysoulPayment/Payment/src/Implementations/Key/Alipay/alipay_public_key.pem',
            'sign_type' => 'RSA',
        ],

        'unionpay' => [
            'enabled' => false,
            'service_id' => '2088221979483694',
            'private_key_path' => '/var/www/dreamsark/packages/SkysoulPayment/Payment/src/Implementations/Key/Unionpay/700000000000001_acp.pfx',
            'private_key_pwd' => '000000',
        ],

        'wechat' => [
            'enabled' => false,
            'seller_id' => '2088221979483694'
        ]

    ]

];