@extends('layouts.master')

@section('content')

    <div class="home-page__background">

        <div class="home-page__background__overlay"></div>

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
            <ark-nav-item active>Project</ark-nav-item>
            <ark-nav-item>Idea</ark-nav-item>
            <ark-nav-item>Synapse</ark-nav-item>
            <ark-nav-item>Script</ark-nav-item>
        </ark-nav>

    </div>



    <div class="row">
        <div class="small-8">1</div>
        <div class="small-4">
            2
        </div>
    </div>

@endsection
