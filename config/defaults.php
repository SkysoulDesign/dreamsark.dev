<?php

return [

    /**
     * Defaults for Settings
     */
    'settings' => [
        'language' => 'cn',
    ],
    'general'  => [
        'pagination' => [
            'per_page' => 10
        ],
    ],

    'project' => [

        'voting_span_time' => 1, /* Defined in Minutes */

        'idea'    => [
            /**
             * Defines the minimum of submission this model
             * should have to be considered not failed
             */
            'minimum_of_submissions' => 1
        ],
        'synapse' => [
            'minimum_of_submissions' => 1
        ],
        'script'  => [
            'minimum_of_submissions' => 1
        ]
    ],
    'profile' => [
        'image' => 'user-profiles/images/',
        'video' => 'user-profiles/videos/',
        'file'  => 'user-profiles/files/',
    ],
    'payment' => [
        'prefix'      => ['pay' => 'DAPG', 'withdraw' => 'DAWG'],
        'credentials' => [
            'alipay'   => [
                'partner_id' => '2088221979483694'
            ],
            'unionpay' => [
//            'partner_id' => '777290058131411',
                'partner_id' => '700000000000001'
            ],
            'wechat' => [
                'partner_id' => '1225312702', // merchant id
                /*'app_id' => 'wx426b3015555a46be',
                'key' => 'e10adc3949ba59abbe56e057f20f883e',
                'secret' => '01c6d59a3f9024db6336662ac95c8e74',*/
                'app_id' => 'wx426b3015555a46be',
                'key' => 'e10adc3949ba59abbe56e057f20f883e',
                'secret' => '01c6d59a3f9024db6336662ac95c8e74',

            ]
        ]
    ]
];