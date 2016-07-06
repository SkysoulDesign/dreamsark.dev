<div class="base-page">

    @include('partials.navigation.menu')

    @if(!isset($header))

        <div class="base-page__header --default">

            <div class="row align-middle +full-height">
                <div class="small-12 medium-3 columns +center-on-mobile">
                    <div class="base-page__header__avatar">
                        <img class="+shadow" src="{{asset('img/temp/avatar-huge.png')}}" alt="">
                    </div>
                </div>
                <div class="small-12 medium-9 columns">
                    something here
                </div>
            </div>

        </div>

        @if(!isset($nav))
            @include('user.partials.nav')
        @endif

    @endif

</div>
