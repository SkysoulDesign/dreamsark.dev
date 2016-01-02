<div id="project-synapse-show-modal" class="ui modal">
    <div class="header">
        @lang('project.synapse')
    </div>
    <div class="content">
        {{ $project->synapse->submission->content }}
    </div>
    <div class="actions">
        <div class="ui green deny button">
            @lang('forms.okay')
        </div>
    </div>
</div>