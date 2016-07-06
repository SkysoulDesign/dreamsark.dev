<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, Mandrill, and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'mandrill' => [
        'secret' => env('MANDRILL_SECRET'),
    ],

    'ses' => [
        'key'    => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'stripe' => [
        'model'  => DreamsArk\Models\User\User::class,
        'key'    => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

    'facebook' => [
        'client_id' => '362581440466557', // rafael's developer account
        'client_secret' => '26ed1f3839d143867cfefa98d9c0b5de',
        'redirect' => 'http://dev.dreamsark.com/login/social/facebook/status',
//        'redirect' => 'http://dreamsark.dev/login/social/facebook/status',
    ],

    'weixin' => [
        'client_id' => 'wx010b4bc4dfdd0bd6',
        'client_secret' => '757493e63e783c6e56643a250eb85d70',
        'redirect' => 'http://dev.dreamsark.com/login/social/weixin/status',
    ],

    'qq' => [
        /*'client_id' => '101326108',
        'client_secret' => '4b95073ed2bfe5a8a5c34432c7454941',*/
        'client_id' => '101327148',
        'client_secret' => '30200fd4c5ef835e0e7e6f0f90461ecf',
        'redirect' => 'http://dev.dreamsark.com/login/social/qq/status',
    ],

    'weibo' => [
        'client_id' => '312525492',
        'client_secret' => 'dcc3d3251161333acd2ed9e391757863',
        'redirect' => 'http://dev.dreamsark.com/login/social/weibo/status',
    ],

];
