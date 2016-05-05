<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>DreamsArk</title>

    @yield('styles')

    <link rel="stylesheet" media="all" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" media="all" href="{{ asset('css/semantic.min.css') }}">
    <link rel="stylesheet" media="all" href="{{ asset('css/grid.css') }}">
    <link rel="stylesheet" media="all" href="{{ asset('css/common.css') }}">

</head>
<body class="main">

@if(isset($isIFrameCall) && $isIFrameCall)
@else
    @if(isset($topBar) ? $topBar : true)
        @include('layouts.top-bar-user')
    @endif

    @yield('header')
    @include('layouts.mini-header-user')
@endif

<div class="ui container">
    @include('errors.errors')
    <input type="hidden" name="app_token" value="{{ csrf_token() }}">
    <div class="ui one column stackable grid">
        @yield('content')
    </div>
</div>
@yield('footer')

@yield('scripts')


<script src="{{ asset('js/jquery.min.js') }}"></script>
<script src="{{ asset('js/semantic.min.js') }}"></script>
<script src="{{ asset('js/common-functions.js') }}"></script>

@yield('pos-scripts')

</body>
</html>