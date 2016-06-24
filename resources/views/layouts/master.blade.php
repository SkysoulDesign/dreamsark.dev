<!doctype html>
<html lang="en" xmlns="http://dreamsark.dev/schema">

<head>
    <meta charset="UTF-8">
    <title>DreamsArk</title>

    @yield('meta-tags')

    @yield('styles')

    <link rel="stylesheet" media="all" href="{{ asset('css/app.css') }}">
    <meta name="viewport" content="width=device-width, initial-scale=0.7, maximum-scale=0.7, user-scalable=no">

</head>

<body id="app-root" {!! isset($class) ? "class=\"$class\"" : '' !!}>

@yield('content')

@yield('scripts')

<script src="{{ asset('js/app.js') }}"></script>

@section('pos-scripts')

    <script>
        app.page('common');
    </script>

@endsection

@yield('pos-scripts', 'pos-scripts')

</body>
</html>