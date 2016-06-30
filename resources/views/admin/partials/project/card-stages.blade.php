@if(class_basename($project->stage)!='Distribution')
    @if($project->stage->vote->active)

        <a href="javascript:;" class="ui green label">
            <i class="wait icon"></i>
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
            <i class="remove icon"></i>
            @lang('project.failed')
        </a>

    @endif

@else
    @if($project->stage->active)
        <a href="javascript:;" class="ui green label">
            <i class="check circle outline icon"></i>
            @lang('project.complete')
        </a>
    @endif
@endif
