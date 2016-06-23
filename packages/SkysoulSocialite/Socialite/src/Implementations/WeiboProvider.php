<?php

namespace SkysoulDesign\Socialite\Implementations;

use Laravel\Socialite\Two\User;
use SocialiteProviders\Weibo\Provider;

class WeiboProvider extends Provider
{
    protected function mapUserToObject(array $user)
    {
        \Log::info($user);

        return (new User())->setRaw($user)->map([
            'id'     => $user['idstr'], 'nickname' => $user['name'],
            'avatar' => $user['avatar_large'], 'name' => null, 'email' => null,
        ]);
    }

}