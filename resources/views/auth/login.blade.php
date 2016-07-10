@extends('layouts.master', ['footer' => false])

@section('content')

    <div class="login-page">

        <ark-flipper class="row align-middle align-right +full-height">

            <ark-flipper-front class="small-12 medium-6 large-4 columns card">

                <div class="card__content">

                    <div class="card__content__header">
                        Login Form
                        <p>Welcome to dreamsark, login or apply for a new account</p>
                    </div>

                    <ark-form action="{{ route('login.store') }}"
                              token="{{ csrf_token() }}"
                              errors="{{ $errors->toJson() }}">

                        <ark-input name="login" placeholder="username or email"></ark-input>
                        <ark-input name="password" type="password"></ark-input>
                        <ripple-button type="submit">
                            Login
                        </ripple-button>
                    </ark-form>

                    <div class="divider --mini --spaced">or login with</div>

                    <ark-social url="{{ route('login.social.post') }}">
                        <ark-wechat></ark-wechat>
                        <ark-qq></ark-qq>
                        <ark-weibo></ark-weibo>
                    </ark-social>

                </div>

                <div class="card__caption --white">
                    You are not a member yet?
                    <div>
                        <a data-flipper-trigger href="{{ route('register') }}">click here to register.</a>
                    </div>
                </div>

            </ark-flipper-front>

            <ark-flipper-back class="small-12 medium-6 large-4 columns card">


                <div class="card__content">

                    <div class="card__content__image --avatar-like">
                        <img src="{{ asset('img/temp/avatar.png') }}" alt="">
                    </div>

                    <div class="card__content__header">
                        Member Register
                        <p>Welcome to dreamsark, login or apply for a new account</p>
                    </div>

                    <ark-nav basic>
                        <ark-tab content="tab-standard" active>
                            Standard
                            @push('tab-item')
                            <div id="tab-standard">
                                <ark-form action="{{ route('login.store') }}"
                                          token="{{ csrf_token() }}"
                                          errors="{{ $errors->toJson() }}">

                                    <ark-input name="username" placeholder="username"></ark-input>
                                    <ark-input name="email" placeholder="email"></ark-input>
                                    <ark-input name="password" type="password"></ark-input>
                                    <ripple-button type="submit">
                                        Login
                                    </ripple-button>
                                </ark-form>
                            </div>
                            @endpush
                        </ark-tab>
                        <ark-tab content="tab-mobile">
                            Mobile
                            @push('tab-item')
                            <div id="tab-mobile">
                                <ark-form id="mobile-login-form"
                                          action="{{ route('login.store') }}"
                                          token="{{ csrf_token() }}"
                                          errors="{{ $errors->toJson() }}">

                                    <ark-input name="mobile" placeholder="mobile number"></ark-input>

                                    <ark-fields>
                                        <ark-input name="code" placeholder="sms code"></ark-input>
                                        <ark-ajax-button method="get" action="{{ route('mobile.send.verify') }}" data-from="mobile-login-form">
                                            Send Code
                                        </ark-ajax-button>
                                    </ark-fields>

                                    <ripple-button type="submit">
                                        Login
                                    </ripple-button>
                                </ark-form>
                            </div>
                            @endpush
                        </ark-tab>
                    </ark-nav>

                    @stack('tab-item')

                    <div class="divider --mini --spaced">or register with</div>

                    <ark-social url="{{ route('login.social.post') }}">
                        <ark-wechat></ark-wechat>
                        <ark-qq></ark-qq>
                        <ark-weibo></ark-weibo>
                    </ark-social>

                </div>

                <div class="card__caption --white">
                    You are not a member yet?
                    <div>
                        <a data-flipper-trigger href="{{ route('register') }}">click here to register.</a>
                    </div>
                </div>

            </ark-flipper-back>

        </ark-flipper>


    </div>

@endsection
