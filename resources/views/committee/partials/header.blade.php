<div class="row --fluid align-center admin-page__top">
    <div class="small-10 columns">

        <div class="row align-middle">
            <div class="small-2 columns admin-page__top__brand">
                <img src="{{ asset('img/temp/dreamsark-white.png') }}" alt="">
            </div>
            <div class="small-8 columns">
                @include('committee.partials.nav')
            </div>
            <div class="columns">
                <ul class="ul --inline --right">
                    <li>
                        @include('partials.navigation.dropdown')
                    </li>
                </ul>
            </div>
        </div>

    </div>
    <div class="small-10 columns admin-page__top__content">
        <header class="header --uppercase">
            @lang('admin.admin-section')
        </header>
    </div>
</div>


{{--@include('partials.navigation.menu')--}}

{{--@if(!isset($header))--}}

    {{--<div class="admin-page__header">--}}

        {{--<div class="base-page__header__overlay"></div>--}}

        {{--<header class="header --centered">--}}
            {{--@lang('committee.committee-section')--}}
        {{--</header>--}}

    {{--</div>--}}

    {{----}}

{{--@endif--}}
