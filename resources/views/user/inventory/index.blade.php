@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row align-center align-middle +margin-top">
        <div class="small-3 columns" dropable="true">
            <div class="inventory-page__drop-zone" data-zone="a">
                <span>a</span>
            </div>
        </div>
        <div class="small-3 columns" dropable="true">
            <div class="inventory-page__drop-zone" data-zone="b">
                <span>b</span>
            </div>
        </div>
    </div>

    <div class="row align-center +margin-top">
        <div class="small-2 columns">
            <button id="merger-button" class="--button --fluid --color-primary">Merge</button>
        </div>
    </div>

    <div class="row align-center segment --large-padding +margin-top">

        @foreach($items as $item)
            <div class="small-1 columns">
                <img src="{{ asset($item->image) }}" draggable="true" data-id="{{ $item->id }}">
            </div>
        @endforeach

    </div>

@endsection
