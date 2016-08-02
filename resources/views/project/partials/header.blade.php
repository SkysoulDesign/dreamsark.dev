<div class="project-page__background">

    <div class="project-page__background__overlay"></div>

    @include('partials.navigation.menu', ['translucent' => true])

    <div class="row project-page__header">
        <div class="small-12 columns align-middle">
            <header class="header --color-white --centered --large">
                {{ $title }}
            </header>
        </div>
    </div>

    @stack('tabs')

</div>
