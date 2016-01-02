<div id="idea-submit-modal" class="ui modal">
    <div class="header">
        @lang('idea.submission-form-title')
    </div>
    <div class="content">
        <form id="idea-submit-form" class="ui error form" method="post"
              action="{{ route('project.submission.store', $project->id) }}">

            {{ csrf_field() }}

            @include('partials.select', ['name' => 'visibility', 'collection' => [0=>trans('forms.private'), 1=>trans('forms.public')]])
            @include('partials.textarea', ['name' => 'content', 'label' => trans('forms.description')])

        </form>
    </div>
    <div class="actions">
        <div class="ui black deny button">
            @lang('forms.cancel')
        </div>
        <div class="ui positive right labeled icon button">
            @lang('forms.submit')
            <i class="checkmark icon ok"></i>
        </div>
    </div>
</div>