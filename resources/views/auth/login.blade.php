@extends('layouts.master')

@section('content')

    <div class="centered">

        <div class="segments">

            <div class="segment --12-columns-mobile --3-columns-desktop --8-offset-desktop">

                <div class="segment__content">

                    <header class="header --classic">
                        Login Form
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </header>

                    <ark-form action="{{ route('login.store') }}"
                              token="{{ csrf_token() }}"
                              errors="{{ $errors->toJson() }}">

                        <ark-input name="login" placeholder="username or email"></ark-input>
                        <ark-input name="password" type="password"></ark-input>
                        <ripple-button type="submit">
                            Login
                        </ripple-button>
                    </ark-form>

                    {{--<form action="{{ route('login.store') }}" method="POST">--}}

                    {{--<div class="form__field">--}}
                    {{--<input name="login" type="text" placeholder="username or email">--}}
                    {{--</div>--}}

                    {{--<div class="form__field">--}}
                    {{--<input name="password" type="password" placeholder="password">--}}
                    {{--</div>--}}

                    {{--<div class="form__message --error">--}}
                    {{--<div class="form__message__header">--}}
                    {{--Oops... something went wrong...--}}
                    {{--</div>--}}
                    {{--<ul class="form__message__items">--}}
                    {{--<li>The login field is required.</li>--}}
                    {{--</ul>--}}
                    {{--</div>--}}

                    {{--<div class="form__field">--}}
                    {{--<button id="js-ripple-btn" class="button --ripple">--}}

                    {{--Login--}}

                    {{--<svg class="ripple-obj" id="js-ripple">--}}
                    {{--<use width="4" height="4" xlink:href="#dreamsark-polygon" class="js-ripple"></use>--}}
                    {{--</svg>--}}

                    {{--</button>--}}
                    {{--<div style="height: 0; width: 0; position: absolute; visibility: hidden;"--}}
                    {{--aria-hidden="true">--}}
                    {{--<svg version="1.1" xmlns="http://www.w3.org/2000/svg"--}}
                    {{--xmlns:xlink="http://www.w3.org/1999/xlink"--}}
                    {{--focusable="false">--}}
                    {{--<symbol id="dreamsark-polygon" viewBox="0 0 100 100">--}}
                    {{--<g>--}}
                    {{--<polygon--}}
                    {{--points="5.6,77.4 0,29 39.1,0 83.8,19.3 89.4,67.7 50.3,96.7"></polygon>--}}
                    {{--<polygon fill="rgba(255,255,255,0.35)"--}}
                    {{--transform="scale(0.5), translate(50, 50)"--}}
                    {{--points="5.6,77.4 0,29 39.1,0 83.8,19.3 89.4,67.7 50.3,96.7"></polygon>--}}
                    {{--<polygon fill="rgba(255,255,255,0.25)"--}}
                    {{--transform="scale(0.25), translate(145, 145)"--}}
                    {{--points="5.6,77.4 0,29 39.1,0 83.8,19.3 89.4,67.7 50.3,96.7"></polygon>--}}
                    {{--</g>--}}
                    {{--</symbol>--}}
                    {{--</svg>--}}
                    {{--</div>--}}
                    {{--</div>--}}
                    {{--<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/TweenMax.min.js"></script>--}}
                    {{--<script src="http://tympanus.net/Tutorials/SVGRipples/js/ripple-config.js"></script>--}}
                    {{--</form>--}}

                    <div class="divider --mini">or login with</div>

                    <div class="segment">
                        hello world
                    </div>

                </div>
            </div>

        </div>
    </div>

@endsection

@section('scripts')
    <script>
    </script>
@endsection
