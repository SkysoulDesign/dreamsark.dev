<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Translation</title>
    <link rel="stylesheet" media="all" href="{{ asset('translation-assets/semantic.min.css') }}">
</head>

<body>

<div class="ui container">
    <div class="ui one column stackable grid">
        @yield('content')
    </div>
</div>

<script src="{{ asset('translation-assets/jquery.min.js') }}"></script>
<script src="{{ asset('translation-assets/semantic.min.js') }}"></script>
<script src="{{ asset('translation-assets/app.js') }}"></script>

</body>
</html>
