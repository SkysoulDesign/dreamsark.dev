@if(!auth()->check())

    {{--Logged-out--}}
    <div class="row align-middle --fluid menu  --white-background">

        <div class="small-12 medium-6 columns menu__brand +center-on-mobile">
            <a href="{{ route('home') }}">
                <img src="{{ asset('img/svg/logo.svg') }}">
            </a>
        </div>

        <div class="small-6 columns +align-right">
            <a href="{{ route('project.index') }}" class="menu__item +round +transparent">@lang('navbar.explorer')</a>
            <a href="{{ route('login') }}" class="menu__item --active +round">@lang('navbar.sign-in')</a>
        </div>

    </div>

@else

    {{--Logged-in--}}

    <div class="row align-middle --fluid menu @if($translucent ?? false) --translucent @else --compact --white-background @endif">

        <div class="small-12 medium-6 columns menu__brand +center-on-mobile">
            <a href="{{ route('home') }}">
                <img src="{{ asset('img/svg/logo.svg') }}">
            </a>
        </div>

        <div class="small-6 columns +align-right menu +hidden-on-mobile">

            <a href="{{ route('project.index') }}" class="menu__item +round +transparent">@lang('nav.projects')</a>
            {{--<a href="{{ route('public.profile.index') }}"--}}
               {{--class="menu__item +round +transparent">@lang('nav.talents')</a>--}}
            <a href="{{ route('user.project.create') }}"
               class="menu__item +round +transparent">@lang('navbar.create-project')</a>

            <div class="menu__item --image">
                <img src="{{ asset('img/badges/coin.png') }}" alt="">
                <span data-currency-symbol="@lang('payment.yuan-currency-symbol')">{{ auth()->user()->bag->coins }}</span>
            </div>

            @include('partials.navigation.dropdown')

        </div>
    </div>
@endif


