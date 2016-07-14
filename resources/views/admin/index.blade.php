@extends('layouts.master-admin')

@section('content')
    <h2>@lang('general.site-admin')</h2>
    @foreach($routes as $route)
        <h4>{{ $route['label'] }}</h4>
        <ul>
            @foreach($route['list'] as $item)
                <li>
                    <a href="{{ (isset($item['param'])?route($item['name'], $item['param']):route($item['name'])) }}">{{ $item['label'] }}</a>
                </li>
            @endforeach
        </ul>
    @endforeach
@endsection
