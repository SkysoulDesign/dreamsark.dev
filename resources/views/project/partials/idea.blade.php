@push('tabs')
<ark-nav>

    <ark-tab content="tab-project" active icon="star">

        @lang('project.project')
        @push('tab-item')

        <div id="tab-project" class="row align-center +margin-top">

            <div class="small-12 columns +center">

                <div class="project-page__top-animation">
                    <div class="row">
                        <div class="small-8 columns project-page__top-animation__content">
                            <img src="{{ asset('img/temp/top-bg.png') }}" alt="">
                        </div>
                    </div>
                </div>

                <img class="project-page__avatar"
                     src="{{ asset('img/svg/person-flat.svg') }}"
                     alt="{{ auth()->user()->present()->name }}">

                <header class="header +uppercase +no-margin-top +z-2">
                    Mission
                    <p>Requirements</p>
                </header>

            </div>

            <div class="small-10 columns segment" style="padding-top: 5em">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
                <br>
                <br>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
                dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
                incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </div>

            <div class="small-10 columns segment --primary">
                <div class="row align-center align-middle --large-padding">
                    <div class="small-4 columns project-page__right-divider">
                        <ul class="ul --with-bullets --tight +uppercase">
                            <li class="li --title">achievements</li>
                            <li>2500 points</li>
                            <li>5 experience</li>
                            <li>medails: finder of the year</li>
                            <li>badge: good thier</li>
                        </ul>
                    </div>
                    <div class="small-8 columns">

                        <ul class="ul --inline --evenly +center">
                            <li>
                                <img class="project-page__achievements" src="{{ asset('img/svg/calendar-flat.svg') }}">
                                <div class="+uppercase +bold">voting date</div>
                                <div>07/20/2016 15:02</div>
                            </li>
                            <li>
                                <img class="project-page__achievements" src="{{ asset('img/svg/documents-flat.svg') }}">
                                <div class="+uppercase +bold">submissions</div>
                                <div>10</div>
                            </li>
                            <li>
                                <img class="project-page__achievements"
                                     src="{{ asset('img/svg/badge-simple-flat.svg') }}">
                                <div class="+uppercase +bold">reward</div>
                                <div>$3000</div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

            <ark-progress class="small-10 columns" :data="20" color="primary" size="large" label="10 days left"
                          flat></ark-progress>

            <div class="small-12 columns">
                <header class="header --with-divider +uppercase">
                    User <span>comments</span>
                </header>
            </div>

        </div>

        @endpush

    </ark-tab>

    <ark-tab content="tab-submission" icon="paper-plane">
        Submission
        @push('tab-item')
        <div id="tab-submission" class="row +margin-top">

            @forelse($submissions as $submission)
                <section class="small-12 columns">
                    {{ $submission->content }}
                </section>
            @empty
                <section class="small-12 columns">
                    @lang('project.no-submissions')
                </section>
            @endforelse

        </div>
        @endpush
    </ark-tab>

</ark-nav>
@endpush

@section('tab-content')
    @stack('tab-item')
@endsection
