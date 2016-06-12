@extends('layouts.master')

@section('content')

    <div class="container">

        <div class="segment --7-columns --hidden-on-mobile --transparent">hi</div>

        <div class="segment --3-columns">

            <div class="segment__header">
                Login Form
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>

            <div class="segment__content">

                <form action="{{ route('login.store') }}" method="POST">

                    <div class="form__field">
                        <input name="login" type="text" placeholder="username or email">
                    </div>

                    <div class="form__field">
                        <input name="password" type="password" placeholder="password">
                    </div>

                    <div class="form__message --error">
                        <div class="form__message__header">
                            Oops... something went wrong...
                        </div>
                        <ul class="form__message__items">
                            <li>The login field is required.</li>
                        </ul>
                    </div>
                    <div class="form__field">
                        <button id="js-ripple-btn" class="button --ripple">

                            Login

                            <svg class="ripple-obj" id="js-ripple">
                                <use width="4" height="4" xlink:href="#dreamsark-polygon" class="js-ripple"></use>
                            </svg>

                        </button>
                        <div style="height: 0; width: 0; position: absolute; visibility: hidden;" aria-hidden="true">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink"
                                 focusable="false">
                                <symbol id="dreamsark-polygon" viewBox="0 0 100 100">
                                    <g>
                                        <polygon points="5.6,77.4 0,29 39.1,0 83.8,19.3 89.4,67.7 50.3,96.7"></polygon>
                                        <polygon fill="rgba(255,255,255,0.35)" transform="scale(0.5), translate(50, 50)"
                                                 points="5.6,77.4 0,29 39.1,0 83.8,19.3 89.4,67.7 50.3,96.7"></polygon>
                                        <polygon fill="rgba(255,255,255,0.25)"
                                                 transform="scale(0.25), translate(145, 145)"
                                                 points="5.6,77.4 0,29 39.1,0 83.8,19.3 89.4,67.7 50.3,96.7"></polygon>
                                    </g>
                                </symbol>
                            </svg>
                        </div>
                    </div>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/TweenMax.min.js"></script>
                    <script src="http://tympanus.net/Tutorials/SVGRipples/js/ripple-config.js"></script>
                </form>

            </div>

            <div class="divider --mini">or login with</div>

            <div class="segment">
                hello world
            </div>

        </div>

    </div>

    {{--<div class="segment">--}}

    {{--<ark-form action="{{ route('login.store') }}">--}}

    {{--</ark-form>--}}

    {{--</div>--}}

    {{--<section class="segment medium-4 column">--}}

    {{--<form action="{{ route('login.store') }}" method="POST">--}}

    {{--{{ csrf_field() }}--}}



    {{--<div class="field">--}}
    {{--<input name="password" type="password" placeholder="password">--}}
    {{--</div>--}}

    {{--@include('partials.form-errors')--}}



    {{--</form>--}}

    {{--</section>--}}
@endsection

@section('scripts')
    {{--var hello = "hello"--}}
@endsection

@section('contents')

    <div class="row">

        <section class="medium-8 column">
            <div class="segment"></div>
        </section>

        <section class="medium-4 column">

            <div class="segment has-attachment">

                <div class="title modern center">Member Login</div>


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