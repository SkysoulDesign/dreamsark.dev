@extends('layouts.master')

@section('content')

    <div class="base-page__background">

        <div class="base-page__background__overlay"></div>

        @include('partials.navigation.menu', ['translucent' => true])

        <div class="row">
            <div class="small-12">
                <header class="header --inverted +center">
                    Lorem ipsum dolor sit amet
                    <p>consectetur adipisicing elit. Aperiam cupiditate dicta dolorem eum,
                        exercitationem, fuga ipsam itaque libero minus nam nesciunt nostrum odio, porro qui sapiente sit
                        vel voluptatem voluptates?</p>
                </header>
            </div>
        </div>

        <ark-nav>
            <ark-nav-item content="tab-project" active>Project</ark-nav-item>
            <ark-nav-item content="tab-idea">Idea</ark-nav-item>
            <ark-nav-item content="tab-synapse">Synapse</ark-nav-item>
            <ark-nav-item content="tab-script">Script</ark-nav-item>
            <ark-nav-item content="tab-comments">Comments</ark-nav-item>
        </ark-nav>

    </div>

    <div id="tab-project" class="row project-page --margin-top">

        <div class="small-12 medium-8 small-order-2 medium-order-1 columns">
            <section>
                <img src="{{ asset('img/temp/cover.jpeg') }}" width="100%" alt="">
            </section>
        </div>

        <div class="small-12 medium-4 small-order-1 medium-order-2 columns project-page__info">
            <img src="{{ asset('img/temp/2.jpg') }}" alt="">
            <div class="project-page__info__overlay">

                <div>
                    DIRECTOR:
                    <span>Rafael Milewski</span>
                </div>

                <div>
                    DIRECTOR:
                    <span>Rafael Milewski</span>
                </div>

                <div>
                    RELEASE DATE:
                    <span>June 18, 2015</span>
                </div>

                <span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam cum iure laboriosam laborum,
                    laudantium, minus nisi nobis possimus, provident quaerat quod repellendus velit veniam voluptatem.
                    Architecto libero quos suscipit!
                </span>

                <ark-statistics>
                    <statistic-item data="¥120">COLLECTED</statistic-item>
                    <statistic-item data="4">BACKERS</statistic-item>
                    <statistic-item data="2">CREW MEMBERS</statistic-item>
                </ark-statistics>

                <div>
                    <a href="#" class="button --white --inverted">Vote</a>
                </div>

            </div>
        </div>

    </div>

@endsection



