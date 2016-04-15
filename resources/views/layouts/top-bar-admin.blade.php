<div class="ui inverted blue menu">
    <div class="header item">
        <a href="{{ route('admin.index') }}">
            <img class="ui" src="{{ asset('dreamsark-assets/logo.png') }}" alt="">
        </a>
    </div>
    <a class="active item" href="{{ route('admin.index') }}">
        @lang('navbar.home')
    </a>
    <div class="ui dropdown item">
        @lang('navbar.discover-project')
        <div class="menu">
            <div class="header"></div>
            <a class="item" href="javascript:;">@lang('navbar.discover-project')</a>
        </div>
    </div>
    <div class="ui dropdown item">
        @lang('navbar.configuration')
        <div class="menu">
            <div class="header"></div>
            <a class="item" href="{{ route('admin.question.index') }}">@lang('navbar.questionnaire')</a>
            <a class="item" href="{{ route('admin.profile.index') }}">@lang('navbar.profile')</a>
            <a class="item" href="{{ route('admin.user.index') }}">@lang('navbar.users')</a>
        </div>
    </div>
    <div class="ui dropdown right item">
        @if(auth()->check())
            <img src="{{ asset('dreamsark-assets/avatar.png') }}" alt="Avatar">
            <div class="menu">
                <div class="header"></div>
                <a class="item" href="javascript:;">@lang('navbar.profile'): {{ auth()->user()->username }}</a>
                <a class="item" href="{{ route('logout') }}">@lang('navbar.logout')</a>
            </div>
        @else
            <a class="item" href="{{ route('register') }}">@lang('navbar.register')</a>
            <a class="item" href="{{ route('login') }}">@lang('navbar.login')</a>
        @endif
    </div>
</div>

