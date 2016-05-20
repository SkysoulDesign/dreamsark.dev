@extends('layouts.master-user')

@section('content')

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

@endsection