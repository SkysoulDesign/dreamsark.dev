@extends('layouts.master-user')

@section('content')
    <div class="row">
        <section class="medium-6 column">

            <div class="segment">

                <div class="title modern">Account Settings</div>

                <form action="{{ route('user.settings.update') }}" method="post">
                    {{ method_field('patch') }}√

                    {{ csrf_field() }}

                    <div class="form-item">
                        <input disabled type="text" value="{{ auth()->user()->username }}">
                    </div>

                    <div class="form-item">
                        <input disabled name="email" type="email" placeholder="e-mail"
                               value="{{ auth()->user()->email }}">
                    </div>

                    <div class="form-item">
                        <input name="password" type="password"
                               placeholder="Leave blank if don't want to change password"
                               value="">
                    </div>

                    <div class="form-item">
                        <input name="password_confirmation" type="password" value="">
                    </div>

                    <div class="title">Linked Accounts</div>

                    <ul class="list">
                        <li class="split">
                            <div><img src="{{ asset('dreamsark-assets/wechat.png') }}" alt=""></div>
                            <div class="switch small">
                                <input id="wechat" type="checkbox">
                                <label for="wechat"></label>
                            </div>
                        </li>
                        <li class="split">
                            <div><img src="{{ asset('dreamsark-assets/qq.png') }}" alt=""></div>
                            <div class="switch small">
                                <input id="qq" type="checkbox">
                                <label for="qq"></label>
                            </div>
                        </li>
                        <li class="split">
                            <div><img src="{{ asset('dreamsark-assets/weibo.png') }}" alt=""></div>
                            <div class="switch small">
                                <input id="weibo" type="checkbox">
                                <label for="weibo"></label>
                            </div>
                        </li>
                        <li class="split">
                            <div><img src="{{ asset('dreamsark-assets/facebook.png') }}" alt=""></div>
                            <div class="switch small">
                                <input id="facebook" type="checkbox">
                                <label for="facebook"></label>
                            </div>
                        </li>
                    </ul>

                    @include('partials.form-errors')

                    <div class="form-item">

                        <button type="submit" class="primary rippable">
                            Save

                            <svg>
                                <use width="4" height="4" xlink:href="#dreamsark-polygon" class="js-ripple"></use>
                            </svg>

                            @include('partials.button-ripple')

                        </button>

                    </div>

                </form>

            </div>

        </section>
    </div>
@endsection