<!doctype html>
<html lang="en" xmlns="http://dreamsark.dev/schema">
<head>
    <meta charset="UTF-8">
    <title>DreamsArk</title>

    @yield('meta-tags')

    @yield('styles')

    <link rel="stylesheet" media="all" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" media="all" href="{{ asset('translation-assets/semantic.min.css') }}">
    <meta name="viewport" content="width=device-width, initial-scale=0.7, maximum-scale=0.7, user-scalable=no">

</head>
<body id="app-root" {!! isset($class) ? "class=\"$class\"" : '' !!}>


{{--@include('partials.navigation.admin-menu')--}}
@include('layouts.top-bar-admin')

@include('errors.errors')

<input type="hidden" name="app_token" value="{{ csrf_token() }}">

<div class="row">
    <div class="small-12">
        @yield('content')
    </div>
</div>

<script src="{{ asset('js/App.js') }}"></script>
<script src="{{ asset('translation-assets/jquery.min.js') }}"></script>
<script src="{{ asset('translation-assets/semantic.min.js') }}"></script>

@stack('scripts')

<script>
    dreamsark.page("{{ request()->route()->getName() }}");
    $(document).ready(function () {
        $('.ui.dropdown').dropdown(); // to trigger sub-menu events on click of parent item
        if ($('.tabular.menu:not(.customCall)').length > 0)// to trigger tabbed content in page;; initially added for user/projects page
            $('.tabular.menu:not(.customCall) .item').tab();
        /**
         * prompt user to confirm onDelete event
         */
        $('.button.delete-item').on('click', function () {
            if (confirm("Are you sure to delete this item?")) {
                var deleteForm = $('<form />').html('<input type="hidden" name="_method" value="delete" />' +
                        '<input type="hidden" name="_token" value="' + $('input[name="app_token"]').val() + '" />'
                );
                deleteForm.attr('action', $(this).attr('href'));
                deleteForm.attr('method', 'POST');
                deleteForm.appendTo('body').submit();
                return false;
            } else
                return false;
        });
    });
</script>
@yield('pos-scripts', 'pos-scripts')

</body>
</html>