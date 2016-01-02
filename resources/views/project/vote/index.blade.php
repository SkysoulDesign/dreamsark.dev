@extends('layouts.master')

@section('content')

    <div class="column">

        @if($votes->isEmpty())
            <div class="ui error message">
                <div class="ui header">@lang('project.no-vote')</div>
            </div>
        @else
            @foreach($votes->groupBy('project.stage') as $stage => $votes)
                <div class="ui segments">
                    <div class="ui segment">
                        <p>{{ $stage }} stage </p>
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

@endsection