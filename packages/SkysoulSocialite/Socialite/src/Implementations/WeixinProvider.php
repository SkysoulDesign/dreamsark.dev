<?php

namespace SkysoulDesign\Socialite\Implementations;

use Laravel\Socialite\Two\User;
use SocialiteProviders\Weixin\Provider;

class WeixinProvider extends Provider
{
    /**
     * @var string
     */
    private $authorizeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize';
    /**
     * @var string
     */
    private $qrConnectUrl = 'https://open.weixin.qq.com/connect/qrconnect';

    /**
     * @param array $user
     * @return $this
     */
    protected function mapUserToObject(array $user)
    {
        \Log::info($user);

        return (new User())->setRaw($user)->map([
            'id'     => $user['openid'], 'nickname' => $user['nickname'],
            'avatar' => $user['headimgurl'], 'name' => null, 'email' => null,
        ]);
    }

    /**
     * {@inheritdoc}.
     */
    protected function getAuthUrl($state)
    {
        return $this->buildAuthUrlFromBase($this->qrConnectUrl, $state);
    }

    /**
     * {@inheritdoc}.
     */
    protected function buildAuthUrlFromBase($url, $state)
    {
        $session = $this->request->getSession();

        $query = http_build_query($this->getCodeFields($state));

        return $url . '?' . $query . '#wechat_redirect';
    }

}