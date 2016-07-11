<?php

namespace SkysoulDesign\Socialite\Implementations;

use Laravel\Socialite\Two\User;
use SocialiteProviders\Qq\Provider;

class QqProvider extends Provider
{
    private $customOpenId;

    /**
     * {@inheritdoc}.
     * @see \Laravel\Socialite\Two\AbstractProvider::getUserByToken()
     */
    protected function getUserByToken($token)
    {
        if (is_null($token)) {
            die(redirect()->route('login', ['error' => 'Invalid token received']));
        }
        $response = $this->getHttpClient()->get('https://graph.qq.com/oauth2.0/me?' . $token);
        \Log::info($response->getBody()->getContents());

        $this->customOpenId = json_decode($this->removeCallback($response->getBody()->getContents()), true)['openid']??'';

        if ($this->customOpenId == '') {
            die(redirect()->route('login', ['error' => 'QQ OpenId not received']));
        }

        $response = $this->getHttpClient()->get(
            "https://graph.qq.com/user/get_user_info?$token&openid={$this->customOpenId}&oauth_consumer_key={$this->clientId}"
        );

        return json_decode($this->removeCallback($response->getBody()->getContents()), true);
    }

    protected function mapUserToObject(array $user)
    {
        \Log::info($user);

        return (new User())->setRaw($user)->map([
            'id'   => $this->customOpenId, 'nickname' => $user['nickname']??'',
            'name' => null, 'email' => null, 'avatar' => $user['figureurl_qq_2']??'',
        ]);
    }
}