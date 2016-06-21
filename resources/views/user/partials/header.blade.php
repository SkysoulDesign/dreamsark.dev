<div class="base-page account-page">

    <div class="row align-middle --fluid menu --compact --white-background">

        <div class="small-6 columns menu__brand">
            <a href="{{ route('home') }}">
                <img src="{{ asset('img/temp/dreamsark-blue.png') }}">
            </a>
        </div>

        <div class="small-6 columns +align-right">

            <div class="dropdown">

                <div class="dropdown__trigger">
                    <a href="#">{{ auth()->user()->username }}</a>
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

    <div class="account-page__header">

        <div class="row align-middle +full-height">
            <div class="small-12 medium-3 columns +center-on-mobile">
                <div class="account-page__header__avatar">
                    <img class="+shadow" src="{{asset('dreamsark-assets/avatar-huge.png')}}" alt="">
                </div>
            </div>
            <div class="small-12 medium-9 columns">
                something here
            </div>
        </div>

    </div>

    @include('user.partials.nav')

</div>