@extends('layouts.master', ['topBar' => false])

@section('header')

    <div class="container-fluid small-header"></div>

    <div class="row">

        <section class="medium-8 column">
            <div class="segment"></div>
        </section>

        <section class="medium-4 column">

            <div class="segment has-attachment">

                <div class="title modern center">Member Login</div>

                <form action="{{ route('login.store') }}" method="post">

                    {{ csrf_field() }}

                    <div class="form-item">
                        <input name="login" type="text" placeholder="username or email">
                    </div>

                    <div class="form-item">
                        <input name="password" type="password" placeholder="password">
                    </div>

                    @include('partials.form-errors')

                    <div class="form-item">

                        <button type="submit" class="primary rippable">
                            Login

                            <svg>
                                <use width="4" height="4" xlink:href="#dreamsark-polygon" class="js-ripple"></use>
                            </svg>

                            @include('partials.button-ripple')

                        </button>

                    </div>

                </form>

                <div class="title simple center">or login with</div>

                <div class="social center">
                    <form action="{{ route('login.social.post') }}" method="post" id="social_form">
                        {{ csrf_field() }}
                        <input type="hidden" name="login_through" value="" id="login_through" />
                        <ul>
                            <li>
                                <input title="Login with QQ" type="image"
                                       src="{{ asset('dreamsark-assets/social/qq-40x40.png') }}"
                                       name="social_login"
                                       id="qq"/>
                            </li>
                            <li>
                                <input title="Login with Weibo" type="image"
                                       src="{{ asset('dreamsark-assets/social/weibo-40x40.png') }}" name="social_login"
                                       id="weibo"/>
                            </li>
                            <li>
                                <input title="Login with Wechat"
                                       type="image" src="{{ asset('dreamsark-assets/social/wechat-40x40.png') }}"
                                       name="social_login" id="weixin"/>
                            </li>
                            {{--set hidden as server will be in China and unable to access FB server on ReturnURL from it.
                            even user have VPN and able to login FB, but code-behind process to read data from FB is not possible.
                            so disabling it.
                            <li>
                                <input type="image" src="{{ asset('dreamsark-assets/facebook.png') }}"
                                       name="login_through" value="facebook"/>
                            </li>
                            --}}
                        </ul>
                    </form>
                    <script>
                        var socialForm = document.querySelector('#social_form');
                        socialForm.addEventListener('click', function (event) {
                            event.preventDefault();
                            var target = event.target.id;
                            if (target != undefined && target != '') {
                                document.getElementById('login_through').value = target;
                                socialForm.submit();
                            } else
                                return false;
                        });
                    </script>

                </div>

            </div>

            <div class="attached center">
                <small>
                    <a class="inverted" href="{{ route('register') }}">
                        Are you a new user?
                    </a>
                </small>
            </div>

        </section>

    </div>

@endsection