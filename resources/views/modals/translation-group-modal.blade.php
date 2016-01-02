<div id="translation-group-modal" class="ui modal">
    <div class="header">
        @lang('translation.create-a-new-group')
    </div>
    <div class="content">
        <form id="translation-new-group-form" class="ui form" method="post"
              action="{{ route('translation.newGroup') }}">

            {{ csrf_field() }}

            @include('partials.field', ['name' => 'name', 'placeholder' => trans('translation.group'), 'label' => trans('translation.group')])

        </form>
    </div>
    <div class="actions">
        <div class="ui black deny button">
            @lang('forms.cancel')
        </div>
        <div class="ui positive right labeled icon button">
            @lang('forms.create')
            <i class="checkmark icon ok"></i>
        </div>
    </div>
</div>