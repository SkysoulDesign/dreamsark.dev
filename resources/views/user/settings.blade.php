@extends('layouts.master-user')

@section('content')
    @include('user.partials.navbar-left')
    <div class="twelve wide stretched column">
        <h2>@lang('profile.update-information')</h2>
        <div class="ui segment">
            <form action="{{ route('user.settings.update') }}" method="post" class="ui form">
                {{ method_field('patch') }}
                {{ csrf_field() }}
                <div class="form-item">
                    <input name="name" type="text" value="{{ auth()->user()->name }}">
                </div>
                <div class="form-item">
                    <input name="username" readonly type="text" value="{{ auth()->user()->username }}">
                </div>
                <div class="form-item">
                    <input {{ (auth()->user()->email!=''?'readonly ':'') }} name="email" type="email" placeholder="e-mail"
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

    </div>

@endsection