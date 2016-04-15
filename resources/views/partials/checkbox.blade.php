<div class="fields {{ $parent_class or '' }}">
    <label>{{ $label or trans('forms.'.str_replace('_', '-', $name)) }}</label>
    @foreach($options as $key => $value)
        <div class="field">
            {{--*/ $checked = (@$default!='' && in_array($key, $default) ? ' checked' : '') /*--}}
            <div class="ui{{ $checked }} checkbox">
                <input type="checkbox"
                       {{ $checked!='' ? $checked.'=""' : '' }} id="{{ $name.'_'.$key }}"
                       name="{{ $name }}" value="{{ $key }}">
                <label for="{{ $name.'_'.$key }}">{{ $value }}</label>
            </div>
        </div>
    @endforeach
</div>