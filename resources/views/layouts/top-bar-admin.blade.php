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
        Projects
        <div class="menu">
            <div class="header"></div>
            <a class="item" href="javascript:;">@lang('navbar.discover-project')</a>
        </div>
    </div>
    <div class="ui dropdown item">
        Configurations
        <div class="menu">
            <div class="header"></div>
            <a class="item" href="{{ route('admin.question.index') }}">Questions</a>
            <a class="item" href="{{ route('admin.profile.index') }}">Profile</a>
            <a class="item" href="{{ route('admin.user.index') }}">Users</a>
        </div>
    </div>
    @include('layouts.top-bar-right')
</div>

