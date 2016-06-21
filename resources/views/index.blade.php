@extends('layouts.master')

@section('meta-tags')
    <meta property="qc:admins" content="302711632664251531236375"/>
@endsection

@section('content')

    <div class="home-page">

        <div class="home-page__background">

            <div class="home-page__background__overlay"></div>

            @include('partials.menu')

            <div class="row slider">
                Lorem ipsum sit amet, consectetur adipisicing elit.
            </div>

        </div>

        <div class="row --fluid nav --hover align-center">

            <ul class="row medium-uncollapse +center-on-mobile">

                <li class="columns nav__item --active"><a href="#">first item</a></li>
                <li class="columns nav__item"><a href="#">item</a></li>
                <li class="columns nav__item"><a href="#">item</a></li>
                <li class="columns nav__item"><a href="#">item</a></li>
                <li class="columns nav__item"><a href="#">item</a></li>
                <li class="columns nav__item"><a href="#">item</a></li>
                <li class="columns nav__item +hidden-on-mobile"><a href="#">last item</a></li>

            </ul>

        </div>

        <div class="row">

            @foreach(range(1,24) as $item)

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
                        Founded in Ann Arbor, Michigan, Ghostly International's varied roster includes Matthew Dear,
                        Tycho, ...
                    </div>
                </div>

            @endforeach

        </div>

    </div>

@endsection