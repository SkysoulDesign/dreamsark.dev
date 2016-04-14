<div class="container-fluid top-bar ui inverted transparent menu">
    <div class="header item">
        <a href="{{ route('home') }}">
            <img class="ui" src="{{ asset('dreamsark-assets/logo.png') }}" alt="">
        </a>
    </div>
    <a class="active item" href="{{ route('home') }}">
        @lang('navbar.home')
    </a>
    <div class="ui dropdown item">
        @lang('navbar.discover-project')
        <div class="menu">
            <div class="header"></div>
            <a class="item" href="{{ route('projects') }}">@lang('navbar.discover-project')</a>
            <a class="item" href="{{ route('user.projects') }}">@lang('navbar.my-projects')</a>
            <a class="item" href="{{ route('project.create') }}">@lang('navbar.create-project')</a>
        </div>
    </div>
    <div class="ui dropdown right item">
        @if(auth()->check())
            <img src="{{ asset('dreamsark-assets/avatar.png') }}" alt="Avatar">
            <div class="menu">
                <div class="header"></div>
                <a class="item" href="{{ route('profile') }}">@lang('navbar.profile'): {{ auth()->user()->username }}</a>
                <a class="item" href="{{ route('user.settings') }}">@lang('profile.settings')</a>
                <a class="item" href="{{ route('logout') }}">@lang('navbar.logout')</a>
            </div>
        @else
            <a class="item" href="{{ route('register') }}">@lang('navbar.register')</a>
            <a class="item" href="{{ route('login') }}">@lang('navbar.login')</a>
        @endif
    </div>
</div>

