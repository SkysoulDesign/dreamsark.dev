<div class="fields {{ $parent_class or '' }}{{ @$required?' required':'' }}">
    <label>{{ $label or trans('forms.'.str_replace('_', '-', $name)) }}</label>
    @foreach($options as $key => $value)
        <div class="field">
            {{--*/ $checked = (@$default!='' && in_array($key, $default) ? ' checked' : '') /*--}}
            <div class="ui{{ $checked }} {{ @$type?:'checkbox' }} checkbox">
                {{--*/ $id = studly_case(str_replace(['[', ']'], ['', ''], $name).'_'.$key) /*--}}
                <input type="{{ @$type?:'checkbox' }}"
                       {{ $checked!='' ? $checked.'=""' : '' }} id="{{ $id }}"
                       name="{{ $name }}" value="{{ $key }}">
                <label for="{{ $id }}">{{ $value }}</label>
            </div>
        </div>
    @endforeach
</div>