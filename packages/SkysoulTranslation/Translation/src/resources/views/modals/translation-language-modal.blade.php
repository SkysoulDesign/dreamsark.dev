<div id="translation-language-modal" class="ui modal">
    <div class="header">
        @lang('translation.create-a-new-language')
    </div>
    <div class="content">
        <form id="translation-new-language-form" class="ui form" method="post" action="{{ route('translation.newLanguage') }}">

            {{ csrf_field() }}

            @include('partials.field', ['name' => 'name', 'placeholder' => trans('translation.language'), 'label' => trans('translation.language')])

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