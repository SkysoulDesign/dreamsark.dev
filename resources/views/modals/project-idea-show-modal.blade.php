<div id="project-idea-show-modal" class="ui modal">
    <div class="header">
        @lang('project.idea')
    </div>
    <div class="content">
        {{ $project->idea->submission->content }}
    </div>
    <div class="actions">
        <div class="ui green deny button">
            @lang('forms.okay')
        </div>
    </div>
</div>