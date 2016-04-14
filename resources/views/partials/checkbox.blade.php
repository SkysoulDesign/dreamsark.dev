<div class="inline fields {{ $parent_class or '' }}">
    <div class="field @if($errors->has($name)) error @endif">
        <label>{{ $label or trans('forms.'.str_replace('_', '-', $name)) }}</label>
        @foreach($options as $key => $value)
            {{--*/ $checked = (@$default!='' && $default == $key ? ' checked' : '') /*--}}
            <div class="ui{{ $checked }} checkbox">
                <input type="checkbox"
                       {{ $checked!='' ? $checked.'=""' : '' }} id="{{ $name.'_'.$key }}"
                       name="{{ $name }}">
                <label for="{{ $name.'_'.$key }}">{{ $value }}</label>
            </div>
        @endforeach
    </div>
</div>