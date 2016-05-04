@if($project->stage->active)
    <a href="javascript:;" class="ui green label">
        <i class="check icon"></i>
        @lang('project.review-published')
    </a>
@else
    <a href="javascript:;" class="ui grey label">
        <i class="configure icon"></i>
        @lang('project.review-waiting')
    </a>
@endif