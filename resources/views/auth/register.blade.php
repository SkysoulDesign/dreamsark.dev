@extends('layouts.master', ['topBar' => false])

@section('header')

    <div class="container-fluid small-header"></div>
@endsection

@section('content')
    <div class="row">

        <section class="medium-8 column">
            <div class="segment"></div>
        </section>

        <section class="medium-4 column">

            <div class="segment has-attachment">

                <div class="push-up">
                    <img src="{{ asset('dreamsark-assets/register-avatar.png') }}" alt="">
                </div>

                <div class="title modern center">@lang('auth.register-form')</div>

                <div class="ui tabular top two item menu">
                    <div class="active item" data-tab="general-register">
                        @lang('auth.general')
                    </div>
                    <div class="item" data-tab="mobile-register">
                        @lang('auth.mobile-register')
                    </div>
                </div>

                <div class="ui active bottom tab segment" data-tab="general-register">

                    <form action="{{ route('register.store') }}" method="post">

                        {{ csrf_field() }}

                        <div class="form-item">
                            <input name="username" type="text" placeholder="{{ trans('forms.username') }}" value="{{ old('username') }}">
                        </div>

                        <div class="form-item">
                            <input name="email" type="email" placeholder="{{ trans('forms.email') }}" value="{{ old('email') }}">
                        </div>

                        <div class="form-item">
                            <input name="password" type="password" placeholder="{{ trans('forms.password') }}">
                        </div>

                        @include('partials.form-errors')

                        <div class="form-item">

                            <button type="submit" class="primary rippable">
                                @lang('auth.register')

                                <svg>
                                    <use width="4" height="4" xlink:href="#dreamsark-polygon" class="js-ripple"></use>
                                </svg>


                            </button>

                        </div>

                    </form>

                </div>
                <div class="ui bottom tab segment project-plan" data-tab="mobile-register">
                    <form action="{{ route('mobile.register.store') }}" method="post">

                        {{ csrf_field() }}

                        <div class="form-item">
                            <input name="username" id="mobile_number" type="text"
                                   placeholder="{{ trans('auth.mobile-number') }}"
                                   value="{{ old('username') }}"/>
                        </div>

                        <div class="form-item">
                            <input name="password" type="password" placeholder="{{ trans('forms.password') }}">
                        </div>

                        <div class="form-item">
                            <input name="sms_code" type="text" placeholder="{{ trans('auth.sms-code') }}"/>
                            &nbsp;
                            <button type="button" id="trigger_sms"
                                    name="trigger_sms">{{ trans('auth.send-code') }}</button>
                        </div>

                        <div class="form-item">
                            <button id="mobile_submit" type="submit" class="primary rippable">
                                @lang('auth.register')
                                <svg>
                                    <use width="4" height="4" xlink:href="#dreamsark-polygon" class="js-ripple"></use>
                                </svg>
                            </button>
                        </div>

                    </form>
                </div>

                <div class="title simple center">@lang('auth.register-with')</div>

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
                        @lang('auth.click-to-login')
                    </a>
                </small>
            </div>

        </section>

    </div>

@endsection

@section('pos-scripts')
    {{--<script src="{{ asset('js/jquery.min.js') }}"></script>
    <script src="{{ asset('js/semantic.min.js') }}"></script>
    <script>
        $(document).ready(function () {
            if ($('.tabular.menu').length > 0)
                $('.tabular.menu .item').tab();
            $('#trigger_sms').click(function () {
                if ($(this).hasClass('in-process'))
                    return false;
                var mobileNumber  = $('#mobile_number').val();
                var phone_pattern = /^1[3|5|7|8|][0-9]{9}$/;
                if (mobileNumber != '' && mobileNumber != undefined) {
                    if (phone_pattern.test(mobileNumber)) {
                        var sendSmsCode = $("#trigger_sms");
                        var times       = 90;
                        var setBtn      = function () {
                            sendSmsCode.val(times);
                            sendSmsCode.attr({disabled: 'disabled'});
                            if (times == -1) {
                                sendSmsCode.html('{{ trans('auth.get-code') }}');
                                sendSmsCode.removeAttr('disabled');
                                clearInterval(clear);
                            } else {
                                sendSmsCode.html(times + ' {{ trans('general.seconds') }}');
                            }
                            times--;
                        };
                        var clear       = setInterval(function () {
                            setBtn()
                        }, 1000);
                        $.getJSON('{{ route('mobile.send.verify') }}', {mobile_number: mobileNumber}, function (data) {
//                            data = JSON.parse(data);
                            if (data.result == undefined || data.result != 0) {
                                clearInterval(clear);
                                sendSmsCode.html('{{ trans('auth.get-code') }}').removeAttr('disabled');
                                var message = data.message == undefined ? '{{ trans('auth.fail-sending') }}' : data.message;
                                alert(message);
                            }
                        });
                    } else
                        alert('{{ trans('auth.invalid-mobile-number') }}')
                } else
                    alert('{{ trans('auth.enter-mobile-number') }}')
            });
        });
    </script>
    <style>
        .ui.tab {
            display: none;
        }

        .ui.tab.active {
            display: block;
        }

        .segment div.menu {
            position: relative;
            right: 0;
            display: table;
            width: 100%;
        }

        .segment div.menu .item {
            display: table-cell;
            border: 1px solid #ccc;
            padding: 2px;
            text-align: center;
        }

        .segment div.menu .item.active {
            background: none #ccc;
        }
    </style>--}}
@endsection