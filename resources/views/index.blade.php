@extends('layouts.master', ['class' => 'home-page'])

@section('meta-tags')
    <meta property="qc:admins" content="302711632664251531236375"/>
@endsection

@section('content')

    <div class="home-page__background">

        <div class="home-page__background__overlay"></div>

        @include('partials.navigation.menu', ['translucent' => true])

        <div class="row align-center slider">
            @lang('dashboard.site-welcome')
            <small>@lang('dashboard.site-welcome-description')</small>
        </div>

    </div>

    <ark-nav>
        <ark-tab content="tab-latest" active>
            @lang('dashboard.latest')
            @push('tab-item')
            <div id="tab-latest" class="row">
                <div class="small-12 columns">
                    <header class="header --full --light --small">
                        @lang('dashboard.latest-project')
                    </header>
                </div>

                @foreach(range(1,4) as $item)
                    <div class="small-12 medium-4 large-3 columns card">

                        <div class="card__image">
                            <img src="{{ asset('img/temp/cover.jpeg') }}" alt="">
                            <div class="card__image__stage">Script</div>
                            <div class="card__image__avatar">
                                <img src="{{ asset('img/temp/cover.jpeg') }}" alt="">
                            </div>
                        </div>

                        <div class="card__content --has-footer --has-image">
                            <div class="card__content__title">
                                <h1>Disney: The Jungle Book</h1>
                                <h3>Record Label • Ann Arbor, MI</h3>
                            </div>
                        </div>

                        <ark-progress value="{{ random_int(0, 100) }}" flat></ark-progress>

                        <div class="card__footer">
                            Founded in Ann Arbor, Michigan, Ghostly International's varied roster includes Matthew
                            Dear,
                            Tycho, ...
                        </div>
                    </div>
                @endforeach
            </div>
            @endpush
        </ark-tab>
        <ark-tab content="tab-popular" {{ activeRoute('user.profile') }}>
            @lang('dashboard.popular')
            @push('tab-item')
            <div id="tab-popular" class="row">
                <div class="small-12 columns">
                    <header class="header --full --light --small">
                        @lang('dashboard.what-popular')
                    </header>
                </div>
                @foreach(range(1,3) as $item)
                    <div class="small-12 medium-3 large-4 columns card">

                        <div class="card__image">
                            <img src="{{ asset('img/temp/cover.jpeg') }}" alt="">
                            <div class="card__image__stage">Script</div>
                            <div class="card__image__avatar">
                                <img src="{{ asset('img/temp/cover.jpeg') }}" alt="">
                            </div>
                        </div>

                        <div class="card__content --has-footer --has-image">
                            <div class="card__content__title">
                                <h1>Disney: The Jungle Book</h1>
                                <h3>Record Label • Ann Arbor, MI</h3>
                            </div>
                        </div>

                        <ark-progress value="{{ random_int(0, 100) }}" flat></ark-progress>

                        <div class="card__footer">
                            Founded in Ann Arbor, Michigan, Ghostly International's varied roster includes Matthew
                            Dear,
                            Tycho, ...
                        </div>
                    </div>
                @endforeach
            </div>
            @endpush
        </ark-tab>
        <ark-tab content="tab-voting" {{ activeRoute('user.profile') }}>
            @lang('dashboard.voting')
            @push('tab-item')
            <div id="tab-voting" class="row">
                <div class="small-12 columns">
                    <header class="header --full --light --small">
                        @lang('dashboard.latest-project')
                    </header>
                </div>

                @foreach(range(1,4) as $item)
                    <div class="small-12 medium-4 large-3 columns card">

                        <div class="card__image">
                            <img src="{{ asset('img/temp/cover.jpeg') }}" alt="">
                            <div class="card__image__stage">Script</div>
                            <div class="card__image__avatar">
                                <img src="{{ asset('img/temp/cover.jpeg') }}" alt="">
                            </div>
                        </div>

                        <div class="card__content --has-footer --has-image">
                            <div class="card__content__title">
                                <h1>Disney: The Jungle Book</h1>
                                <h3>Record Label • Ann Arbor, MI</h3>
                            </div>
                        </div>

                        <ark-progress value="{{ random_int(0, 100) }}" flat></ark-progress>

                        <div class="card__footer">
                            Founded in Ann Arbor, Michigan, Ghostly International's varied roster includes Matthew
                            Dear,
                            Tycho, ...
                        </div>
                    </div>
                @endforeach
            </div>
            @endpush
        </ark-tab>
    </ark-nav>

    @stack('tab-item')

    <div class="row" style="padding-bottom: 3em">

        <div class="small-12 columns">
            <div class="divider">@lang('dashboard.load-more')</div>
        </div>

        <div class="small-12 columns">
            <header class="header --light --small">
                Learm more about Dreamsark
                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate officia omnis quasi repellat?
                    Adipisci aperiam assumenda debitis distinctio dolore eaque exercitationem libero natus quas, rem
                    rerum
                    similique veniam veritatis. Expedita?</p>
            </header>

        </div>

    </div>

    @if(!auth()->check())
        <div class="row --fluid +center">
            <div class="small-12 columns home-page__not-member">
                <h2>
                    @lang('dashboard.no-member-message')
                </h2>
                <a href="{{ route('register') }}" class="button --fit --hollow-white">@lang('dashboard.join-now')</a>
            </div>
        </div>
    @endif

@endsection
