@extends('layouts.master', ['footer' => false])

@section('content')

    <div class="login-page">

        <ark-flipper class="row align-middle align-right +full-height">

            <ark-flipper-front class="small-12 medium-6 large-4 columns card">

                <div class="card__content">

                    <div class="card__content__header">
                        @lang('auth.login-form')
                        <p>@lang('auth.login-register-welcome')</p>
                    </div>

                    <ark-form action="{{ route('login.store') }}"
                              token="{{ csrf_token() }}"
                              errors="{{ $errors->toJson() }}">

                        <ark-input name="login" placeholder="{{ trans('auth.user-or-email') }}"></ark-input>
                        <ark-input name="password" type="password"></ark-input>
                        <ripple-button type="submit">
                            @lang('auth.login')
                        </ripple-button>
                    </ark-form>

                    <div class="divider --mini --spaced">@lang('auth.login-with')</div>

                    <ark-social url="{{ route('login.social.post') }}">
                        <ark-wechat></ark-wechat>
                        <ark-qq></ark-qq>
                        <ark-weibo></ark-weibo>
                    </ark-social>

                </div>

                <div class="card__caption --white">
                    @lang('auth.no-member')
                    <div>
                        <a data-flipper-trigger href="{{ route('register') }}">@lang('auth.click-to-register')</a>
                    </div>
                </div>

            </ark-flipper-front>

            <ark-flipper-back class="small-12 medium-6 large-4 columns card">

                <div class="card__content">

                    <div class="card__content__image --avatar-like">
                        <img src="{{ asset('img/temp/avatar.png') }}" alt="">
                    </div>

                    <div class="card__content__header">
                        @lang('auth.register-form')
                        <p>@lang('auth.login-register-welcome')</p>
                    </div>

                    <ark-nav basic>
                        <ark-tab content="tab-standard" active>
                            @lang('auth.register-standard')
                            @push('tab-item')
                            <div id="tab-standard">
                                <ark-form action="{{ route('login.store') }}"
                                          token="{{ csrf_token() }}"
                                          errors="{{ $errors->toJson() }}">

                                    <ark-input name="username" placeholder="{{ trans('forms.username') }}"></ark-input>
                                    <ark-input name="email" placeholder="{{ trans('forms.email') }}"></ark-input>
                                    <ark-input name="password" type="password"></ark-input>
                                    <ripple-button type="submit">
                                        @lang('auth.register')
                                    </ripple-button>
                                </ark-form>
                            </div>
                            @endpush
                        </ark-tab>
                        <ark-tab content="tab-mobile">
                            @lang('auth.register-mobile')
                            @push('tab-item')
                            <div id="tab-mobile">
                                <ark-form id="mobile-login-form"
                                          action="{{ route('register.store') }}"
                                          token="{{ csrf_token() }}"
                                          errors="{{ $errors->toJson() }}">

                                    <ark-input name="mobile" placeholder="{{ trans('auth.mobile-number') }}"></ark-input>

                                    <ark-fields>
                                        <ark-input name="code" placeholder="{{ trans('auth.sms-code') }}"></ark-input>
                                        <ark-ajax-button set-disabled="yes" :set-timer="90" timer-text="{{ trans('general.seconds') }}" method="post" action="{{ route('mobile.send.verify') }}" data-from="mobile-login-form">
                                            @lang('auth.send-code')
                                        </ark-ajax-button>
                                    </ark-fields>

                                    <ark-input name="password" type="password"></ark-input>

                                    <ripple-button type="submit">
                                        @lang('auth.register')
                                    </ripple-button>
                                </ark-form>
                            </div>
                            @endpush
                        </ark-tab>
                    </ark-nav>

                    @stack('tab-item')

                    <div class="divider --mini --spaced">@lang('auth.register-with')</div>

                    <ark-social url="{{ route('login.social.post') }}">
                        <ark-wechat></ark-wechat>
                        <ark-qq></ark-qq>
                        <ark-weibo></ark-weibo>
                    </ark-social>

                </div>

                <div class="card__caption --white">
                    @lang('auth.already-member')
                    <div>
                        <a data-flipper-trigger href="{{ route('login') }}">@lang('auth.go-to-login')</a>
                    </div>
                </div>

            </ark-flipper-back>

        </ark-flipper>


    </div>

@endsection

@push('scripts')
<script>
    dreamsark.on('ajax.button.success', function(e, button){
        var responseData = e.json();
        if (responseData.result == undefined || responseData.result != 0) {
            if (responseData.message != undefined && responseData.message != '')
                alert(responseData.message)
            button.disabled = false;
        } else {
            if (button.setTimer > 0) {
                let countDown = button.setTimer;
                let buttonElement = button.$el.firstElementChild,
                    buttonText = buttonElement.innerText;
                let doTimer = setInterval(function () {
                    if (countDown == -1) {
                        buttonElement.innerText = buttonText;
                        button.disabled = false;
                        clearInterval(doTimer);
                    } else {
                        buttonElement.innerText = countDown + ' ' + button.timerText;
                    }
                    countDown--;
                }, 1000);
            }
        }
    });
</script>
@endpush
