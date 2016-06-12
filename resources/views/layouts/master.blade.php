<!doctype html>
<html lang="en" xmlns="http://dreamsark.dev/schema">
<head>
    <meta charset="UTF-8">
    <title>DreamsArk</title>

    @yield('styles')

    <link rel="stylesheet" media="all" href="{{ asset('css/app.css') }}">

</head>

<body id="app-root" class="main">

    @yield('content')

@yield('scripts')

<script src="{{ asset('js/app.js') }}"></script>

@yield('pos-scripts')

</body>
</html>