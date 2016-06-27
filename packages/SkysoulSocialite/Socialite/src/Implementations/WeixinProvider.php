<?php

namespace SkysoulDesign\Socialite\Implementations;

use Laravel\Socialite\Two\User;
use SocialiteProviders\Weixin\Provider;

/**
 * Created by PhpStorm.
 * User: Vivek
 * Date: 6/23/16
 * Time: 12:16 PM
 */
class WeixinProvider extends Provider
{

    protected function mapUserToObject(array $user)
    {
        \Log::info($user);
        return (new User())->setRaw($user)->map([
            'id'     => $user['openid'], 'nickname' => $user['nickname'],
            'avatar' => $user['headimgurl'], 'name' => null, 'email' => null,
        ]);
    }

}