<div id="project-script-show-modal" class="ui modal">
    <div class="header">
        @lang('project.script')
    </div>
    <div class="content">
        {{ $project->script->submission->content }}
    </div>
    <div class="actions">
        <div class="ui green deny button">
            @lang('forms.okay')
        </div>
    </div>
</div>