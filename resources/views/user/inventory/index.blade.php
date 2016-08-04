@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row">
        <ul>
            @foreach($items as $item)
                <li>{{ $item->id }}</li>
            @endforeach
        </ul>
    </div>

@endsection
