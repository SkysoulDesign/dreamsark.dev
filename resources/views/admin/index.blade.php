@extends('layouts.master-admin')

@section('content')
    <h2>DreamsArk Admin</h2>
    <div class="ui segment">
        <div class="ui link list">
            @foreach($routes as $route)
                <div class="item">
                    <i class="folder icon"></i>
                    <div class="content">
                        <div class="header">{{ $route['label'] }}</div>
                        <div class="list">
                            @foreach($route['list'] as $item)
                                <div class="item">
                                    <i class="file icon"></i>
                                    <div class="content">
                                        <div class="header">
                                            <a href="{{ route($item['name']) }}">{{ $item['label'] }}</a>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection