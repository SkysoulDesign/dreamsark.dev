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
    'salary' => [
        'formula' => [
            'crew' => '(SALARY + ((VOTES - SALARY) / 3)) * COMMISSION_CREW',
            'investor' => '((VOTES - SALARY) / 3) * COMMISSION_INVESTOR',
            'crew_asses' => '((VOTES - SALARY) / 3) * COMMISSION_CREW_ASSES',
        ],
        'commission' => [
            'crew' => 0.97,
            'investor' => 0.97,
            'crew_asses' => 0.97,
        ]
    ],

    'drivers' => [

        /**
         * Alipay defaults and credentials
         */
        'alipay' => [
            'enabled' => true,
            'gateway_url' => 'https://mapi.alipay.com/gateway.do',
            'service_id' => '2088221979483694',
            'service_email' => 'dreamsark666@163.com',
            'service_name' => '北京追梦方舟文化传播有限公司',
            'private_key_path' => base_path('packages/SkysoulPayment/Payment/src/Implementations/Key/Alipay/rsa_private_key.pem'),
            'public_key_path' => base_path('packages/SkysoulPayment/Payment/src/Implementations/Key/Alipay/alipay_public_key.pem'),
            'cert_key_path' => base_path('packages/SkysoulPayment/Payment/src/Implementations/Key/Alipay/cacert.pem'),
            'sign_type' => 'RSA',
            'md5_key' => 'lr2wkirlp7e8mkot0198zyzrqeu0u24f',
        ],

        'unionpay' => [
            'enabled' => true,
            /**
             * Test ENV
             */
            /* 'gateway_url' => 'https://101.231.204.80:5000/gateway/api/frontTransReq.do',
             'service_id' => '802110053110768',
//             'service_id' => '777290058131411',
 //            'service_id' => '700000000000001', ref id given in PRODUCT page
             'private_key_path' => base_path('packages/SkysoulPayment/Payment/src/Implementations/Key/Unionpay/700000000000001_acp.pfx'),
             'private_key_password' => '000000',
             'public_key_path' => base_path('packages/SkysoulPayment/Payment/src/Implementations/Key/Unionpay/verify_sign_acp.cer'),*/
            /**
             * Production ENV
             */
            'gateway_url' => 'https://gateway.95516.com/gateway/api/frontTransReq.do',
            'service_id' => '802110053110768',
            'private_key_path' => base_path('packages/SkysoulPayment/Payment/src/Implementations/Key/Unionpay/802110053110768_acp.pfx'),
            'private_key_password' => '220616',
            'public_key_path' => base_path('packages/SkysoulPayment/Payment/src/Implementations/Key/Unionpay/encryptpub.cer'),
        ],

        'wechat' => [
            'enabled' => true,
            'service_id' => '1350505001',
            'app_id' => 'wx010b4bc4dfdd0bd6',
            'private_key' => 'cc7a7af8783004f561df839621543af1',
            'public_key' => null,
            'secret' => '757493e63e783c6e56643a250eb85d70',
            'gateway_url' => 'https://api.mch.weixin.qq.com/pay/unifiedorder',
            'qr_url' => 'http://paysdk.weixin.qq.com/example/qrcode.php?data=',
        ]

    ]

];
