@extends('layouts.master', ['class' => 'voting-page'])

@section('content')

    <div class="project-page__background">

        <div class="project-page__background__overlay"></div>

        @include('partials.navigation.menu', ['translucent' => true])

        <div class="row project-page__header">
            <div class="small-12 columns align-middle">
                <header class="header --color-white --centered --large">
                    Voting Stage
                </header>
            </div>
        </div>

        @stack('tabs')

    </div>

    <div class="row align-center">

        <div class="small-10 columns segment --attached --centered --overlapped --large-padding">

            <img class="voting-page__illustration" src="{{ asset('img/temp/spider-man.png') }}" alt="">
            <img class="project-page__achievements" src="{{ asset('img/svg/badge-simple-flat.svg') }}">

            <div class="header --light-weight">
                Winner will receive <span class="+color-success">{{ $project->stage->reward->amount }} coins</span>
                <h2>Voting will go on until {{ $project->stage->vote->close_date }}</h2>
            </div>

            <div class="row align-center">
                <ark-progress class="small-10 columns"
                              :live="['{{ $project->stage->vote->open_date }}', '{{ $project->stage->vote->close_date }}']" color="warning"
                              size="large" label="@lang('project.time')" flat></ark-progress>
            </div>
        </div>

        <div class="small-10 columns segment --color-primary --centered --large-padding">
            <div class="header --with-divider">Rewards</div>
            <ul class="ul --inline --evenly +center">

                @foreach(
                 ['milky-way.svg', 'planet-earth.svg', 'moon.svg', 'mercury.svg', 'galaxy.svg',
                  'stars.svg', 'venus.svg'] as $svg)
                    <li>
                        <img class="project-page__achievements"
                             src="{{ asset("img/svg/$svg") }}">
                        <div class="+uppercase +bold">{{ explode('.', $svg)[0] }}</div>
                    </li>
                @endforeach
            </ul>

        </div>

        <div class="small-10 columns segment --centered --large-padding">
            <h1>Original Request</h1>
            {!! $project->stage->content !!}
        </div>

        <div class="small-12 columns +margin-top-small">
            <header class="header --with-divider +uppercase --centered">
                Submissions
            </header>
        </div>

        <div class="small-10">
            <ark-accordion>
                @foreach($project->stage->submissions as $submission)
                    <ark-accordion-item>
                        <div slot="header" class="item --attached --hover">

                            <div class="small-1 columns item__image">
                                <img src="{{ $submission->user->present()->avatar }}" alt="">
                            </div>

                            <div class="small-1 columns">
                                <a href="#hello">{{ $submission->user->present()->name }}</a>
                            </div>

                            <div class="columns">
                                {!!  mb_strimwidth(strip_tags($submission->content), 0, 70, "...")   !!}
                            </div>

                            <div class="small-3 columns">
                                <ark-statistics class="align-center">
                                    <statistic-item data="40" icon="eye">Number of Views</statistic-item>
                                    <statistic-item data="{{ $submission->votes->sum('pivot.amount') }}"
                                                    icon="heart">Number of Votes
                                    </statistic-item>
                                </ark-statistics>
                            </div>

                        </div>

                        <div class="small-12 columns segment --attached --large-padding">
                            {!! $submission->content !!}
                        </div>
                        <div class="small-12 columns segment --centered --large-padding">
                            <ark-form
                                    action="{{ route('project.idea.submission.vote.store', [$project, $submission]) }}">
                                {{ csrf_field() }}
                                <ark-input type="number" name="amount"
                                           placeholder="@lang('forms.amount')"></ark-input>
                                <ark-button color="primary">Vote on this idea</ark-button>
                            </ark-form>
                        </div>
                    </ark-accordion-item>
                @endforeach
            </ark-accordion>
        </div>

    </div>

@endsection
