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

                    <div class="card__content__header">
                        Register
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

            </ark-flipper-back>

        </ark-flipper>

    </div>

@endsection
