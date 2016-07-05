<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Translation</title>
    <link rel="stylesheet" media="all" href="{{ asset('translation/css/semantic.min.css') }}">
</head>

<body>

<div class="ui container">
    <div class="ui one column stackable grid">
        @yield('content')
    </div>
</div>

@yield('scripts')

<script src="{{ asset('translation/js/jquery.min.js') }}"></script>
<script src="{{ asset('translation/js/semantic.min.js') }}"></script>

</body>
</html>
