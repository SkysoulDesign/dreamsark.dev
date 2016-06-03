<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>DreamsArk</title>

    @yield('styles')

    <link rel="stylesheet" media="all" href="{{ asset('css/app.css') }}">

</head>

<body class="main">

<div class="expanded row" style="margin-top: 200px">
    @yield('content')
</div>

@yield('scripts')

<script src="{{ asset('js/app.js') }}"></script>

@yield('pos-scripts')

</body>
</html>