<div class="ui fluid card">
    <div class="content">

        <i class="right floated like icon"></i>
        <i class="right floated star icon"></i>

        <p></p>

        <a href="#{{$project->type}}" class="ui orange ribbon label">
            {{ strtoupper(trans('project.' . $project->type)) }}
        </a>

        <a href="{{ route('project.show', $project->id) }}">{{ $project->name }}</a>

    </div>

    <div class="extra content">
        <p>{{ $project->script->content }}</p>
    </div>

</div>