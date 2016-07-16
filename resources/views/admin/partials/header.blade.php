@include('partials.navigation.menu')

@if(!isset($header))

    <div class="admin-page__header">

        <div class="base-page__header__overlay"></div>

        <header class="header --centered">
            @lang('admin.admin-section')
        </header>

    </div>

    @include('admin.partials.nav')

@endif
