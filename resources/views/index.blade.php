@extends('layouts.master')

@section('header')
    @include('layouts.huge-header')
@endsection

@section('content')

    @include('layouts.content-header')
    @include('layouts.content-grid')
    {{--@include('layouts.content-2')--}}

@endsection

@section('footer')

    @include('layouts.footer-large')

@endsection

@section('styles')
    <link href="{{ asset('css/dragdealer.css') }}" rel="stylesheet" type="text/css">
@endsection

@section('scripts')
    <script src="{{ asset('js/dragdealer.js') }}"></script>
    <script src="{{ asset('js/particle.js') }}"></script>
    <script>

        var canvasMask = new Dragdealer('canvas-mask', {
            x:0.5,
            y: 0.5,
            vertical: true,
            speed: 0.2,
            loose: true,
            requestAnimationFrame: true
        });

    </script>
@endsection