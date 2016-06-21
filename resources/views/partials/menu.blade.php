@if(!auth()->check())

    {{--Logged-out--}}

    <div class="small-6 columns menu__brand">
        <a href="{{ route('home') }}">
            <img src="{{ asset('dreamsark-assets/logo.png') }}">
        </a>
    </div>

    <div class="small-6 columns +align-right">
        <a href="#" class="menu__item +round +transparent">Explorer</a>
        <a href="{{ route('login') }}" class="menu__item +round">Sign-in</a>
    </div>

@else

    {{--Logged-in--}}

    <div class="small-10 medium-6 columns menu__brand +center-on-mobile">
        <a href="{{ route('home') }}">
            <img src="{{ asset('dreamsark-assets/logo.png') }}">
        </a>
    </div>

    {{--@todo menu for mobile--}}
    <div class="small-2 columns +hidden-on-desktop">
        <img height="100" width="100" src="{{ asset('img/temp/menu.png') }}" alt="">
    </div>

    <div class="small-6 columns +align-right +hidden-on-mobile">

        <a href="#" class="menu__item +round +transparent">Explorer</a>
        <a href="#" class="menu__item +round +transparent">Explorer</a>
        <a href="#" class="menu__item +round +transparent">Explorer</a>
        <a href="#" class="menu__item +round +transparent">Explorer</a>

        <div class="dropdown">

            <div class="menu__avatar">
                <img src="{{ asset('img/avatar/5.jpg') }}" alt="">
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

@endif