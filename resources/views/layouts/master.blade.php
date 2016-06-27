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

<div class="row +center">
    <div class="small-12">
        <header>
            This is the footer
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque esse exercitationem, illo magni nesciunt
                numquam odio porro suscipit ut, veritatis vero voluptatem? Autem deserunt doloribus ea, libero magnam
                odit
                quas!</p>
        </header>
    </div>
</div>

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
