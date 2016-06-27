<?php

namespace SkysoulDesign\Socialite;
use SocialiteProviders\Manager\SocialiteWasCalled;

class ExtendSocialiteProvider
{
    /**
     * Register the provider.
     *
     * @param \SocialiteProviders\Manager\SocialiteWasCalled $socialiteWasCalled
     */
    public function handle(SocialiteWasCalled $socialiteWasCalled)
    {

        $socialiteWasCalled->extendSocialite(
            'weixin', __NAMESPACE__.'\Implementations\WeixinProvider'
        );
        $socialiteWasCalled->extendSocialite(
            'weibo', __NAMESPACE__.'\Implementations\WeiboProvider'
        );
        $socialiteWasCalled->extendSocialite(
            'qq', __NAMESPACE__.'\Implementations\QqProvider'
        );

    }

}