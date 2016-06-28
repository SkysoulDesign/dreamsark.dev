@extends('layouts.master')

@section('content')

    @include("project.partials." . class_basename($project->stage))

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

        @stack('tabs')

    </div>

    @yield('tab-content')

@endsection
