@extends('layouts.master')

@section('header')
    @include('layouts.mini-header')
@endsection

@section('content')

    <div class="row">

        <section class="medium-6 column">

            {{-- Segment Start --}}
            <div class="segment">

                <div class="title">General Information</div>

                <div class="menu">
                    <button class="outlined small">edit</button>
                </div>

                <div class="body">
                    <div class="head">
                        <h1>{{ auth()->user()->username }}</h1>
                    </div>
                    <div class="description">
                        <i class="fa fa-map-marker"></i> Sao Paulo, Brasil
                    </div>
                </div>

                <hr>

                <div class="title">
                    Backed projects
                </div>

                <div class="body">

                    <div class="description">
                        There is nothing here at the moment
                    </div>
                </div>
            </div>
            {{-- Segment End --}}

        </section>

        <section class="medium-6 column">

            <div class="segment">

                <div class="title modern">Account Settings</div>

                <form action="{{ route('register.store') }}" method="post">

                    {{ csrf_field() }}

                    <div class="form-item">
                        <input disabled type="text" value="{{ auth()->user()->username }}">
                    </div>

                    <div class="form-item">
                        <input name="email" type="email" placeholder="e-mail">
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

@section('contenta')

    <div class="sixteen wide column" style="margin-bottom: 20px">

        <div class="ui tall stacked segment">
            <img class="ui small circular image" src="{{ auth()->user()->present()->avatar }}">
        </div>

    </div>

    <div class="three wide column">

        <div id="menu" class="ui vertical menu">
            <div class="item">
                <div class="header">@lang('profile.profile')</div>
                <div class="menu">
                    <a class="item" data-tab="home">@lang('profile.personal-information')</a>
                </div>
            </div>
            <div class="item">
                <div class="header">@lang('profile.account')</div>
                <div class="menu">
                    <a class="item">@lang('profile.change-password')</a>
                    <a class="item">@lang('profile.bind-social-media')</a>
                </div>
            </div>
            <div class="item">
                <div class="header">Position</div>
                <div class="menu">
                    <a class="item" data-tab="position">Positions</a>
                </div>
            </div>
            <div class="item">
                <div class="header">@lang('profile.settings')</div>
                <div class="menu">
                    <a class="item" data-tab="language">@lang('profile.language')</a>
                </div>
            </div>
        </div>

    </div>

    <div class="thirteen wide column">

        <div class="ui tab active" data-tab="home">
            <div class="ui segment">
                <div class="ui small header">@lang('profile.personal-information')</div>
                @include('forms.personal-information')
            </div>
        </div>

        <div class="ui tab" data-tab="position">
            <div class="ui segment">
                <div class="ui small header">@lang('profile.positions')</div>
                @include('forms.human-positions')
            </div>
        </div>

        <div class="ui tab" data-tab="language">
            <div class="ui segment">
                <div class="ui small header">@lang('profile.language')</div>
                @include('forms.settings-language')
            </div>
        </div>

    </div>

@endsection