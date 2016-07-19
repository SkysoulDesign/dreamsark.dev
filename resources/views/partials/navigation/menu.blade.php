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

    {{--Logged-in--}}

    <div class="row align-middle --fluid menu @if($translucent ?? false) --translucent @else --compact --white-background @endif">

        <div class="small-12 medium-6 columns menu__brand +center-on-mobile">
            <a href="{{ route('home') }}">
                <img src="{{ asset('img/temp/dreamsark-blue.png') }}">
            </a>
        </div>

        <div class="small-6 columns +align-right menu +hidden-on-mobile">

            <a href="{{ route('project.index') }}" class="menu__item +round +transparent">@lang('nav.projects')</a>
            <a href="{{ route('public.profile.index') }}" class="menu__item +round +transparent">@lang('nav.talents')</a>

            <div class="menu__item --image">
                <img src="{{ asset('img/badges/coin.png') }}" alt="">
                <span data-currency-symbol="@lang('payment.yuan-currency-symbol')">{{ $user->bag->coins or 0 }}</span>
            </div>

            <ark-dropdown title="{{ auth()->user()->username }}" mode="simple">

                <ark-dropdown-option href="{{ route('user.account') }}">
                    @lang('navbar.account')
                </ark-dropdown-option>

                @can('see-admin-section', auth()->user())
                    <ark-dropdown-option href="{{ route('admin.index') }}">
                        @lang('navbar.admin')
                    </ark-dropdown-option>
                @endcan

                @can('see-committee-section', auth()->user())
                    <ark-dropdown-option href="{{ route('committee.index') }}">
                        @lang('navbar.committee')
                    </ark-dropdown-option>
                @endcan

                <ark-dropdown-option>
                    @lang('navbar.settings')
                </ark-dropdown-option>

                <ark-dropdown-option href="{{ route('logout') }}">
                    @lang('navbar.logout')
                </ark-dropdown-option>

            </ark-dropdown>

        </div>
    </div>
@endif


