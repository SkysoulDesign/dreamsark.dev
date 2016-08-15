@include('partials.navigation.menu')

@if(!isset($header))

    <div class="profile-page__header --default">

        <div class="profile-page__header__overlay"></div>

        <div class="row align-middle +full-height">
            <div class="small-12 medium-3 columns +center-on-mobile">
                <div class="profile-page__header__avatar">
                    <img class="+shadow" src="{{ auth()->user()->present()->avatar }}" alt="">
                </div>
            </div>
            {{--<div class="small-12 medium-9 columns align-self-bottom">--}}
                {{--<ul class="badges --inline --right">--}}
                    {{--<li>--}}
                        {{--<img src="{{ asset('img/badges/book.png') }}" alt=""> 200--}}
                    {{--</li>--}}
                    {{--<li>--}}
                        {{--<img src="{{ asset('img/badges/book-2.png') }}" alt=""> 500--}}
                    {{--</li>--}}
                    {{--<li>--}}
                        {{--<img src="{{ asset('img/badges/potion.png') }}" alt=""> 10--}}
                    {{--</li>--}}
                    {{--<li>--}}
                        {{--<img src="{{ asset('img/badges/ring.png') }}" alt=""> 18--}}
                    {{--</li>--}}
                    {{--<li>--}}
                        {{--<img src="{{ asset('img/badges/glass.png') }}" alt=""> 9--}}
                    {{--</li>--}}
                {{--</ul>--}}
            {{--</div>--}}
        </div>

    </div>

    @if(!isset($nav))
        @include('user.partials.nav')
    @endif

@endif

