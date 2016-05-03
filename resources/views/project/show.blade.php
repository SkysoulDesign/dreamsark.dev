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

        @include('partials.comments')

    </div>

@endsection

@section('pos-scripts')
    @if(strtolower(class_basename($project->stage))=='review')
        <script>
            $(document).ready(function () {
                if ($('#project-idea-show-modal').length > 0)
                    $('#project-idea-show-modal')
                            .modal({
                                blurring: true,
                            })
                            .modal('attach events', '#project-idea-show', 'show');

                if ($('#project-synapse-show-modal').length > 0)
                    $('#project-synapse-show-modal')
                            .modal({
                                blurring: true,
                            })
                            .modal('attach events', '#project-synapse-show', 'show');

                if ($('#project-script-show-modal').length > 0)
                    $('#project-script-show-modal')
                            .modal({
                                blurring: true,
                            })
                            .modal('attach events', '#project-script-show', 'show');
            });
        </script>
    @endif
@endsection