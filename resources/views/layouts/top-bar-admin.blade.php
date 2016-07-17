<div class="ui inverted blue menu">
    <div class="header item small-3 columns">
        <a href="{{ route('home') }}">
            <img class="ui" src="{{ asset('img/temp/dreamsark-white.png') }}" alt="">
        </a>
    </div>
    @if(auth()->user()->can('see-admin-section'))
        <a class="active item" href="{{ route('admin.index') }}">
            @lang('navbar.home')
        </a>
        <div class="ui dropdown item">
            @lang('navbar.discover-project')
            <div class="menu">
                <div class="header"></div>
                <a class="item" href="{{ route('admin.project.index') }}">@lang('navbar.discover-project')</a>
            </div>
        </div>

    @endif
    @if(auth()->user()->can('see-committee-section'))
        <div class="ui dropdown item">
            @lang('navbar.committee')
            <div class="menu">
                <div class="header"></div>
                <a class="item"
                   href="{{ route('committee.project.review.index') }}">@lang('navbar.project-in-review')</a>
                <a class="item"
                   href="{{ route('committee.project.fund.index') }}">@lang('navbar.project-in-fund')</a>
                <a class="item"
                   href="{{ route('committee.project.distribution.index') }}">@lang('navbar.project-in-distribute')</a>

            </div>
        </div>
    @endif
    <div class="ui dropdown item">
        @lang('navbar.transactions')
        <div class="menu">
            <a class="item"
               href="{{ route('admin.transaction.purchase', 'all') }}">@lang('navbar.purchases')</a>
            <a class="item"
               href="{{ route('admin.transaction.withdraw', 'all') }}">@lang('navbar.withdrawals')</a>
        </div>
    </div>
    @if(auth()->user()->can('see-admin-section'))
        <div class="ui dropdown item">
            @lang('navbar.configuration')
            <div class="menu">
                <div class="header"></div>
                <a class="item" href="{{ route('admin.profile.question.index') }}">@lang('navbar.questions')</a>
                <a class="item" href="{{ route('admin.profile.index') }}">@lang('navbar.profile')</a>
                <a class="item" href="{{ route('admin.user.index') }}">@lang('navbar.users')</a>
            </div>
        </div>
    @endif
    @include('layouts.top-bar-right')
</div>

