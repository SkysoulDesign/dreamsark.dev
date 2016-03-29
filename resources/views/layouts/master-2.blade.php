<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>DreamsArk</title>

    @yield('styles')


    <link rel="stylesheet" media="all" href="{{ asset('css/semantic.min.css') }}">
    <link rel="stylesheet" media="all" href="{{ asset('css/grid.css') }}">

</head>
<body class="main">


@yield('header')

<div class="ui container">

    @include('layouts.top-bar-new')

    <div class="ui one column stackable grid">
        @yield('content')
        @yield('footer')
    </div>
</div>

@yield('scripts')

<script src="{{ asset('js/jquery.min.js') }}"></script>
<script src="{{ asset('js/semantic.min.js') }}"></script>
<script src="{{ asset('js/common-functions.js') }}"></script>

@yield('pos-scripts')

</body>
</html>