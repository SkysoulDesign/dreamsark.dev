@extends('layouts.master-user')

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

        @if(isset($isIFrameCall) && $isIFrameCall)
        @else
            @include('partials.comments')
        @endif

    </div>

@endsection

@section('pos-scripts')
    @if(in_array(strtolower(class_basename($project->stage)), ['review', 'fund']))
        @include('forms.project-stage-script')
    @endif
@endsection