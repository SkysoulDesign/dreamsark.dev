@extends('layouts.master')

@section('meta-tags')
    <meta property="qc:admins" content="302711632664251531236375"/>
@endsection

@section('content')

    <div class="home-page">

        <div class="row align-justify --fluid menu">

            <div class="small-6 columns">
                <a href="{{ route('home') }}">
                    <img src="{{ asset('dreamsark-assets/logo.png') }}">
                </a>
            </div>

            <div class="small-6 columns +align-right">
                <div href="#" class="menu__item --round --transparent">Explorer</div>
                <div href="#" class="menu__item --round --active">Sign-in</div>
            </div>

        </div>

        <div class="row --fluid medium-unstack menu">

            <div class="column menu__item">
                <a href="{{ route('home') }}">
                    <img src="{{ asset('dreamsark-assets/logo.png') }}">
                </a>
            </div>

            <div class="column menu__item">
                <a class="active item" href="{{ route('home') }}">
                    Home
                </a>
            </div>

        </div>

        <div class="row slider">
            Slider
        </div>

        <div>

        </div>

    </div>

@endsection

{{--@section('header')--}}
{{--@include('layouts.huge-header')--}}
{{--@endsection--}}

{{--@section('content')--}}

{{--@include('layouts.content-header')--}}
{{--@include('layouts.content-grid')--}}

{{--@endsection--}}

{{--@section('footer')--}}

{{--@include('layouts.footer-large')--}}

{{--@endsection--}}

{{--@section('styles')--}}
{{--<link href="{{ asset('css/dragdealer.css') }}" rel="stylesheet" type="text/css">--}}
{{--@endsection--}}

{{--@section('scripts')--}}
{{--<script src="{{ asset('js/dragdealer.js') }}"></script>--}}
{{--<script src="{{ asset('js/particle.js') }}"></script>--}}
{{--<script>--}}

{{--var canvasMask = new Dragdealer('canvas-mask', {--}}
{{--x:0.5,--}}
{{--y: 0.5,--}}
{{--vertical: true,--}}
{{--speed: 0.2,--}}
{{--loose: true,--}}
{{--requestAnimationFrame: true--}}
{{--});--}}

{{--</script>--}}
{{--@endsection--}}