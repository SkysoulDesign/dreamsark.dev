@extends('layouts.master', ['topBar' => false])

@section('header')

    <div class="container-fluid small-header"></div>

    <div class="row">

        <section class="medium-8 column">
            <div class="segment"></div>
        </section>

        <section class="medium-4 column">

            <div class="segment has-attachment">

                <div class="push-up">
                    <img src="{{ asset('dreamsark-assets/register-avatar.png') }}" alt="">
                </div>

                <div class="title modern center">Member Register</div>

                <form action="{{ route('register.store') }}" method="post">

                    {{ csrf_field() }}

                    <div class="form-item">
                        <input name="username" type="text" placeholder="username" value="{{ old('username') }}">
                    </div>

                    <div class="form-item">
                        <input name="email" type="email" placeholder="e-mail" value="{{ old('email') }}">
                    </div>

                    <div class="form-item">
                        <input name="password" type="password" placeholder="password">
                    </div>

                    @include('partials.form-errors')

                    <div class="form-item">

                        <button type="submit" class="primary rippable">
                            Register

                            <svg>
                                <use width="4" height="4" xlink:href="#dreamsark-polygon" class="js-ripple"></use>
                            </svg>

                            @include('partials.button-ripple')

                        </button>

                    </div>

                </form>

                <div class="title simple center">or register with</div>

                <div class="social center">
                    <form action="{{ route('login.social.post') }}" method="post">
                        {{ csrf_field() }}
                        <ul>
                            <li>
                                <input title="Login with QQ" type="image"
                                       src="{{ asset('dreamsark-assets/qq-50x16.png') }}"
                                       name="login_through"
                                       value="qq"/>
                            </li>
                            <li>
                                <input title="Login with Weibo" type="image"
                                       src="{{ asset('dreamsark-assets/weibo-46x16.png') }}" name="login_through"
                                       value="weibo"/>
                            </li>
                            <li>
                                <input title="Login with Wechat" type="image"
                                       src="{{ asset('dreamsark-assets/wechat.png') }}"
                                       name="login_through" value="weixin"/>
                            </li>
                        </ul>
                    </form>
                </div>

            </div>

            <div class="attached center">
                <small>
                    <a class="inverted" href="{{ route('login') }}">
                        Are you looking for login instead?
                    </a>
                </small>
            </div>

        </section>

    </div>

@endsection