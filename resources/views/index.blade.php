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

        <ark-nav>
            <ark-nav-item active>Item</ark-nav-item>
            <ark-nav-item {{ active('user.profile') }}>Item</ark-nav-item>
            <ark-nav-item {{ active('user.profile') }}>Item</ark-nav-item>
            <ark-nav-item {{ active('user.profile') }}>Item</ark-nav-item>
            <ark-nav-item {{ active('user.profile') }}>Item</ark-nav-item>
        </ark-nav>

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