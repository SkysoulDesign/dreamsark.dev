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
            <a class="item" href="{{ route('votes') }}">@lang('navbar.vote')</a>
            <a class="item" href="{{ route('user.projects') }}">@lang('navbar.my-projects')</a>
            <a class="item" href="{{ route('project.create') }}">@lang('navbar.create-project')</a>
        </div>
    </div>
    @include('layouts.top-bar-right')
</div>

