@if($project->stage->vote->active)

    <a href="javascript:;" class="ui green label">
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

    <a href="javascript:;" class="ui red label">
        <i class="x icon"></i>
        @lang('project.failed')
    </a>

@endif