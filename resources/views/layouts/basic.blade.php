<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>DreamsArk</title>

    <link rel="stylesheet" media="all" href="{{ asset('css/app.css') }}">

</head>
<body>

<div class="container-fluid">
    @yield('content')
</div>

@yield('scripts')
@yield('pos-scripts')

</body>
</html>