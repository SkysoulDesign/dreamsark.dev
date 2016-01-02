@extends('layouts.master')

@section('content')

    <div class="column">

        @if(!($project->stage instanceof \DreamsArk\Models\Project\Stages\Review) && ! ($project->stage instanceof \DreamsArk\Models\Project\Stages\Fund)&& !$project->stage->active)
            <div class="ui inverted red segment">
                @lang('project.project-failed')
            </div>
        @endif

        @if(!($project->stage instanceof \DreamsArk\Models\Project\Stages\Review) && !($project->stage instanceof \DreamsArk\Models\Project\Stages\Fund) && $project->stage->vote->active)
            <div class="ui inverted olive segment">
                <a class="ui header" href="{{ route('vote.show', $project->stage->vote->id) }}">
                    @lang('vote.is-open')
                </a>
            </div>
        @endif

        @include('project.' . strtolower(class_basename($project->stage)) . '.show')

            @include('partials.comments')

    </div>

@endsection