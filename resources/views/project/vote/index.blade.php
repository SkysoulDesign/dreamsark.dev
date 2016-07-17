@extends('layouts.master', ['class' => 'project-page'])

@section('content')

    <div class="project-page__background">

        <div class="project-page__background__overlay"></div>

        @include('partials.navigation.menu', ['translucent' => true])

        <div class="row">
            <div class="small-12">
                <header class="header --inverted +center">
                    Voting
                </header>
            </div>
        </div>

    </div>

    <div class="row">

        <div class="small-12 columns">
            <div class="column">

                @if($votes->isEmpty())
                    <div class="ui error message">
                        <div class="ui header">@lang('project.no-vote')</div>
                    </div>
                @else
                    @foreach($votes->groupBy('votable_type') as $stage => $votes)
                        <div class="ui segments">
                            <div class="ui segment">
                                {{ class_basename($stage) }}
                            </div>
                            @foreach($votes as $vote)
                                <div class="ui secondary segment">
                                    <a href="{{ route('vote.show', $vote->id) }}">
                                        {{ $vote->votable->project->name }}
                                    </a>
                                </div>
                            @endforeach
                        </div>
                    @endforeach
                @endif

            </div>
        </div>
    </div>

@endsection
