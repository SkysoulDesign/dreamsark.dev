<!doctype html>
<html lang="en" xmlns="http://dreamsark.dev/schema">

<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="form-errors" content="{{ $errors->toJson() }}">
    <meta name="form-data" content="{{ json_encode(array_except(old(), ['password', '_token'])) }}">
    <meta name="viewport" content="width=device-width, initial-scale=0.7, maximum-scale=0.7, user-scalable=no">

    <title>@lang('general.dreamsark') - {{ request()->route()->getName() }}</title>

@yield('meta-tags')

@stack('styles')

<!-- Temporarily -->
    <link rel="stylesheet" media="all" href="{{ asset('translation-assets/semantic.min.css') }}">

    <link rel="stylesheet" media="all" href="{{ asset('css/app.css') }}">

</head>

<body id="app-root" {!! isset($class) ? "class=\"$class\"" : '' !!}>

@include('errors.errors')

@if($container ?? true)
    <div class="container">
        @yield('content')
    </div>
@else
    @yield('content')
@endif

@if($footer ?? true)
    @include('partials.footer.common')
@endif

<!-- Temporarily -->
<script src="{{ asset('translation-assets/jquery.min.js') }}"></script>
<script src="{{ asset('translation-assets/semantic.min.js') }}"></script>
<script src="{{ asset('js/common-functions.js') }}"></script>
{{--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/turbolinks/5.0.0/turbolinks.min.js"></script>--}}

<script src="{{ asset('js/App.js') }}"></script>

@stack('scripts')

@section('pos-scripts')

    <script>
        dreamsark.page("{{ request()->route()->getName() }}");
    </script>

@endsection

@yield('pos-scripts', 'pos-scripts')

</body>
</html>
