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


@include('partials.navigation.admin-menu')

@include('errors.errors')

<input type="hidden" name="app_token" value="{{ csrf_token() }}">

<div class="row">
    <div class="small-12">
        @yield('content')
    </div>
</div>

<script src="{{ asset('js/App.js') }}"></script>
<script src="{{ asset('translation-assets/jquery.min.js') }}"></script>

@stack('scripts')

<script>
    dreamsark.page("{{ request()->route()->getName() }}");
</script>
@yield('pos-scripts', 'pos-scripts')

</body>
</html>