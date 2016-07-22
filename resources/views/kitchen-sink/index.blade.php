@extends('layouts.master')

@section('content')

    @include('kitchen-sink.partials.menu')

    <div class="row">
        <h1>{{ title_case($section) }}</h1>
    </div>

    @include("kitchen-sink.components.$section")

@endsection
