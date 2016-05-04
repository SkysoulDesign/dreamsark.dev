@if($project->stage->active)
    <a href="javascript:;" class="ui green label">
        <i class="money icon"></i>
        <i class="check icon"></i>
        @lang('project.fund-completed')
    </a>
@else
    <a href="javascript:;" class="ui grey label">
        <i class="money icon"></i>
        @lang('project.fund')
    </a>
@endif