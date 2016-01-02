<div class="ui fluid card">
    <div class="content">

        <i class="right floated like icon"></i>
        <i class="right floated star icon"></i>

        <p></p>

        <a href="#{{$project->type}}" class="ui yellow ribbon label">
            {{ strtoupper(trans('project.' . $project->type)) }}
        </a>

        @if($project->stage->vote->active)

            <a href="{{ route('vote.show', $project->stage->vote->id) }}" class="ui green label">
                <i class="check icon"></i>
                @lang('project.voting')
            </a>

        @endif

        @if($project->stage->submission)

            <a class="ui green label">
                <i class="check icon"></i>
                @lang('project.finished')
            </a>

        @endif

        @if(!$project->stage->active)

            <a href="{{ route('vote.show', $project->stage->vote->id) }}" class="ui red label">
                <i class="x icon"></i>
                @lang('project.failed')
            </a>

        @endif

        <a href="{{ route('project.show', $project->id) }}">{{ $project->name }}</a>

    </div>

    <div class="extra content">
        <p>{{ $project->stage->content }}</p>
    </div>

</div>