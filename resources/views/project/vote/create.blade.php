@extends('layouts.master', ['class' => 'voting-page'])

@section('content')

    @include('project.partials.header', ['title' => 'Voting Stage'])

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
                              :live="['{{ $project->stage->vote->open_date }}', '{{ $project->stage->vote->close_date }}']"
                              color="warning"
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
                @each('project.partials.fragments.vote-submission', $project->stage->submissions, 'submission')
            </ark-accordion>
        </div>

    </div>

@endsection
