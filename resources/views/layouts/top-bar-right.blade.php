<div class="ui dropdown right item">
    @if(auth()->check())
        <img src="{{ asset('dreamsark-assets/avatar.png') }}" alt="Avatar">
        <div class="menu">
            <div class="header"></div>
            <a class="item" href="{{ route('user.account') }}">@lang('navbar.profile'): {{ auth()->user()->username }}</a>

            @can('see-admin-section', auth()->user())
                <a class="item" href="{{ route('admin.index') }}">@lang('navbar.admin')</a>
            @endcan

            <a class="item" href="{{ route('user.settings') }}">@lang('profile.settings')</a>
            <a class="item" href="{{ route('logout') }}">@lang('navbar.logout')</a>
        </div>
    @else
        <a class="item" href="{{ route('register') }}">@lang('navbar.register')</a>
        <a class="item" href="{{ route('login') }}">@lang('navbar.login')</a>
    @endif
</div>