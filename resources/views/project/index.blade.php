@extends('layouts.master')

@section('content')

    <div class="column">

        @if($projects->isEmpty())
            <div class="ui error message">
                <div class="header">@lang('project.no-project')</div>
            </div>
        @else

            @foreach($projects as $project)

                @if($project->stage instanceof \DreamsArk\Models\Project\Stages\Idea)
                    @include('partials.card-idea')
                @endif

                @if($project->stage instanceof \DreamsArk\Models\Project\Stages\Synapse)
                    @include('partials.card-synapse')
                @endif

                @if($project->stage instanceof \DreamsArk\Models\Project\Stages\Script)
                    @include('partials.card-script')
                @endif

                @if($project->stage instanceof \DreamsArk\Models\Project\Stages\Review)
                    @include('partials.card-review')
                @endif

                @if($project->stage instanceof \DreamsArk\Models\Project\Stages\Fund)
                    @include('partials.card-fund')
                @endif

            @endforeach

        @endif
    </div>

@endsection