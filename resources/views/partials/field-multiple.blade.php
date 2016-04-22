<div class="field {{ $parent_class or '' }}">

    <label>{{ $label or trans('forms.'.str_replace('_', ' ', $fields[0]['name'])) }}</label>

    <div class="{{ $class }} fields">

        @foreach($fields as $field)

            <div class="field @if(@$errors && $errors->has($field['name'])) error @endif{{ @$field['required']?' required':'' }}">
                <input {{ @$attributes }} {{ @$field['attributes'] }} @if(isset($id)) id="{{ $id }}"
                       @endif type="{{ $field['type'] or 'text' }}" name="{{ $field['name'] }}"
                       placeholder="{{ $field['placeholder'] or  trans('forms.'.str_replace(' ','-',str_replace('_', ' ', $field['name']))) }}"
                       value="{{ @$field['value'] }}">
            </div>

        @endforeach

    </div>

</div>