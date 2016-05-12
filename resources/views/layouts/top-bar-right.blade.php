<div class="ui dropdown right item">
    <img src="{{ asset('dreamsark-assets/avatar.png') }}" alt="Avatar">
    <div class="menu">
        @if(auth()->check())
            <div class="header"></div>
            <a class="item" href="{{ route('user.account') }}">@lang('navbar.profile')
                : {{ auth()->user()->username }}</a>

            @can('see-admin-section', auth()->user())
                <a class="item" href="{{ route('admin.index') }}">@lang('navbar.admin')</a>
            @endcan

            @can('see-committee-section', auth()->user())
                <a class="item" href="{{ route('committee.index') }}">@lang('navbar.committee')</a>
            @endcan

            <a class="item" href="{{ route('user.settings') }}">@lang('profile.settings')</a>
            <a class="item" href="{{ route('logout') }}">@lang('navbar.logout')</a>
        @else
            <a class="item" href="{{ route('register') }}">@lang('navbar.register')</a>
            <a class="item" href="{{ route('login') }}">@lang('navbar.login')</a>
        @endif
    </div>
</div>