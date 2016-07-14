@if(!auth()->check())

    {{--Logged-out--}}

    <div class="row align-middle --fluid menu  --inverted">

        <div class="small-6 columns menu__brand">
            <a href="{{ route('home') }}">
                <img src="{{ asset('img/temp/dreamsark-white.png') }}">
            </a>
        </div>

        <div class="small-6 columns +align-right">
            <a href="#" class="menu__item +round +transparent">@lang('navbar.explorer')</a>
            <a href="{{ route('login') }}" class="menu__item --active +round">@lang('navbar.sign-in')</a>
        </div>

    </div>

@else

    <div class="row align-middle --fluid menu @if($translucent ?? false) --translucent @else --compact --white-background @endif">

        <div class="small-3 columns menu__brand +center-on-mobile">
            <a href="{{ route('home') }}">
                <img src="{{ asset('img/temp/dreamsark-blue.png') }}">
            </a>
        </div>

        <div class="small-12 medium-6 columns menu +hidden-on-mobile">
            <a href="{{ route('admin.index') }}" class="menu__item +round +transparent">@lang('navbar.home')</a>
            <a href="{{ route('admin.projects') }}"
               class="menu__item +round +transparent">@lang('navbar.discover-project')</a>

            @if(auth()->user()->can('see-committee-section'))
                <div class="dropdown +round +z-10">
                    <div class="dropdown__trigger">@lang('navbar.committee')</div>
                    <div class="dropdown__content">
                        <a class="dropdown__content__item"
                           href="{{ route('committee.project.review.list') }}">@lang('navbar.project-in-review')</a>
                        <a class="dropdown__content__item"
                           href="{{ route('committee.project.fund.list') }}">@lang('navbar.project-in-fund')</a>
                        <a class="dropdown__content__item"
                           href="{{ route('committee.project.distribute.list') }}">@lang('navbar.project-in-distribute')</a>
                    </div>
                </div>
            @endif

            @if(auth()->user()->can('see-admin-section'))
                <div class="dropdown +z-10">
                    <div class="dropdown__trigger">@lang('navbar.transactions')</div>
                    <div class="dropdown__content">
                        <a class="dropdown__content__item"
                           href="{{ route('admin.transactions.purchases', 'all') }}">@lang('navbar.purchases')</a>
                        <a class="dropdown__content__item"
                           href="{{ route('admin.transactions.withdraw', 'all') }}">@lang('navbar.withdrawals')</a>
                    </div>
                </div>

                <div class="dropdown +z-10">
                    <div class="dropdown__trigger">@lang('navbar.configuration')</div>
                    <div class="dropdown__content">
                        <a class="dropdown__content__item"
                           href="{{ route('admin.question.index') }}">@lang('navbar.questions')</a>
                        <a class="dropdown__content__item"
                           href="{{ route('admin.profile.index') }}">@lang('navbar.profile')</a>
                        <a class="dropdown__content__item"
                           href="{{ route('admin.user.index') }}">@lang('navbar.users')</a>
                    </div>
                </div>
            @endif
        </div>
        <div class="small-3 medium-2 columns menu__brand +right-align menu +hidden-on-mobile">
            <div class="dropdown +z-10">
                <div class="dropdown__trigger">
                    {{ auth()->user()->username }}
                </div>
                <div class="dropdown__content">
                    <a href="{{ route('user.account') }}" class="dropdown__content__item">@lang('navbar.account')</a>
                    @can('see-admin-section', auth()->user())
                        <a class="dropdown__content__item" href="{{ route('admin.index') }}">@lang('navbar.admin')</a>
                    @endcan

                    @can('see-committee-section', auth()->user())
                        <a class="dropdown__content__item"
                           href="{{ route('committee.index') }}">@lang('navbar.committee')</a>
                    @endcan
                    <a href="{{ route('logout') }}" class="dropdown__content__item">
                        @lang('navbar.logout')
                    </a>
                </div>
            </div>
        </div>
    </div>
@endif