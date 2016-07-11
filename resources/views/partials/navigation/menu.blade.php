@if(!auth()->check())

    {{--Logged-out--}}

    <div class="row align-middle --fluid menu  --inverted">

        <div class="small-6 columns menu__brand">
            <a href="{{ route('home') }}">
                <img src="{{ asset('img/temp/dreamsark-white.png') }}">
            </a>
        </div>

        <div class="small-6 columns +align-right">
            <a href="#" class="menu__item +round +transparent">Explorer</a>
            <a href="{{ route('login') }}" class="menu__item --active +round">Sign-in</a>
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
            <a href="#" class="menu__item +round +transparent">@lang('nav.talents')</a>

            <div class="dropdown +z-10">

                <div class="dropdown__trigger">
                    {{ auth()->user()->username }}
                </div>

                <div class="dropdown__content">
                    <a href="{{ route('user.account') }}" class="dropdown__content__item">Account</a>
                    <div class="dropdown__content__item">Settings</div>
                    <a href="{{ route('logout') }}" class="dropdown__content__item">
                        Log-out
                    </a>
                </div>

            </div>

        </div>
    </div>
@endif


