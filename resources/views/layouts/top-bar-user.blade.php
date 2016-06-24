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
            <a class="item" href="{{ route('projects') }}">Discover Project</a>
            <a class="item" href="{{ route('votes') }}">Vote</a>
            <a class="item" href="{{ route('user.project.index') }}">My Projects</a>
            <a class="item" href="{{ route('project.create') }}">Create Project</a>
        </div>
    </div>
    <a class="active item" href="{{ route('public.profile.index') }}">
        @lang('navbar.profile')
    </a>
    @include('layouts.top-bar-right')
</div>

