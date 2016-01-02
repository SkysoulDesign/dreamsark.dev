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
                    <ul>
                        <li><img src="{{ asset('dreamsark-assets/wechat.png') }}" alt=""></li>
                        <li><img src="{{ asset('dreamsark-assets/qq.png') }}" alt=""></li>
                        <li><img src="{{ asset('dreamsark-assets/weibo.png') }}" alt=""></li>
                        <li><img src="{{ asset('dreamsark-assets/facebook.png') }}" alt=""></li>
                    </ul>
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