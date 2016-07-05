<div id="translation-translation-modal" class="ui modal">
    <div class="header">
        @lang('translation.create-a-new-translation')
    </div>
    <div class="content">
        <form id="translation-new-translation-form" class="ui form" method="post"
              action="{{ route('translation.newTranslation') }}">

            {{ csrf_field() }}

            @include('partials.select', ['name' => 'language', 'collection' => $languages->lists('name', 'id')])
            @include('partials.select', ['name' => 'group', 'collection' => $groups->lists('name', 'id')])

            @include('partials.field-multiple', array(
            'label' => trans('translation.translation'),
            'fields' => [
                    ['name' => 'key', 'placeholder'=> trans('translation.key')],
                    ['name' => 'value', 'placeholder'=> trans('translation.value')]
                ],
            'class' => 'two'
            ))

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