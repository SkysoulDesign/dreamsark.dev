<div id="translation-translation-modal" class="ui modal">
    <div class="header">
        @lang('translation.create-a-new-translation')
    </div>
    <div class="content">
        <form id="translation-new-translation-form" class="ui form" method="post"
              action="{{ route('translation.newTranslation') }}">

            {{ csrf_field() }}

            <div class="field">
                <label>{{ trans('forms.language') }}</label>
                <select id="language" class="ui dropdown" name="language">
                    <option value="">{{ trans('forms.language') }}</option>
                    @foreach($languages->lists('name', 'id') as $key => $value)
                        <option value="{{ $key }}">{{ trans('translation.'.str_replace(' ', '-', strtolower($value))) }}</option>
                    @endforeach
                </select>
            </div>
            <div class="field">
                <label>{{ trans('forms.group') }}</label>
                <select id="group" class="ui dropdown" name="group">
                    <option value="">{{ trans('forms.group') }}</option>
                    @foreach($groups->lists('name', 'id') as $key => $value)
                        <option value="{{ $key }}">{{ trans('translation.'.str_replace(' ', '-', strtolower($value))) }}</option>
                    @endforeach
                </select>
            </div>

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