@extends('layouts.master', ['class' => 'voting-page'])

@section('content')

    @include('project.partials.header', ['title' => 'Voting Stage'])

    <div class="row align-center">

        <div class="small-10 columns segment --attached --centered --overlapped --large-padding">

            <img class="voting-page__illustration" src="{{ asset('img/temp/spider-man.png') }}" alt="">
            <img class="project-page__achievements" src="{{ asset('img/svg/badge-simple-flat.svg') }}">

            <div class="header --light-weight">
                Position Selection
                <h2>@lang('project.votingEndTime') {{ $project->stage->vote->close_date }}</h2>
            </div>

            <div class="row align-center">
                <ark-progress class="small-10 columns"
                              :live="['{{ $project->stage->vote->open_date }}', '{{ $project->stage->vote->close_date }}']"
                              color="warning"
                              size="large" label="@lang('project.time')" flat></ark-progress>
            </div>
        </div>

        <div class="small-10 columns segment --attached --color-primary --centered --large-padding">
            <div class="header --with-divider">Profiles</div>
            <ul class="ul --inline --centered">
                @foreach($profiles as $profile)
                    <li>
                        <div class="+profile-color-{{ $profile->name }} +margin-bottom-small">
                            <img class="+circle" width="80" src="{{ asset("img/profile/$profile->name.png") }}">
                        </div>
                        <b>@lang("positions.$profile->name")</b>
                    </li>
                @endforeach
            </ul>

        </div>

        <div class="small-10 columns segment --attached --large-padding --centered">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis deserunt ea labore nobis nostrum repellat
            tempore veniam! Dolores esse explicabo harum optio tempora. Adipisci at maxime necessitatibus quisquam
            similique. Quaerat!
        </div>

        <div class="small-10 columns">
            <ark-nav>
                @foreach($profiles as $index => $profile)
                    @include('project.vote.fund.partials.item', [
                        'expenditure' => $project->stage->enrollable->get($index),
                        'active' => active($index, 0)
                    ])
                @endforeach
            </ark-nav>
        </div>

        <div class="small-10">
            @stack('tab-item')
        </div>

        <div class="small-10">
            {{--<ark-accordion>--}}
            {{--@each('project.partials.fragments.vote-submission', $project->stage->submissions, 'submission')--}}
            {{--</ark-accordion>--}}
        </div>

    </div>

@endsection
