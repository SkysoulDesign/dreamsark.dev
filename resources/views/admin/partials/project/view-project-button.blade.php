<a href="javascript:;" class="ui button view-modal"
   id="view-modal-{{ $project_id }}"
   data-modal="project-view-modal-{{ $project_id }}">
    <i class="unhide icon"></i>
    @lang('project.view')
</a>
<div id="project-view-modal-{{ $project_id }}" class="ui fullscreen modal">
    <i class="close icon"></i>
    <div class="ui embed" data-url="{{ route('project.show.iframe', $project_id) }}"
         data-placeholder="{{ asset('dreamsark-assets/mini-header-bg.jpg') }}"
         data-icon="right circle arrow">
    </div>
</div>