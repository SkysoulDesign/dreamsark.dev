<div class="field">

    <label>{{ $label or trans('forms.'.str_replace('_', ' ', $fields[0]['name'])) }}</label>

    <div class="{{ $class }} fields">

        @foreach($fields as $field)

            <div class="field @if($errors->has($field['name'])) error @endif">
                <input @if(isset($id)) id="{{ $id }}" @endif type="{{ $field['type'] or 'text' }}" name="{{ $field['name'] }}"
                       placeholder="{{ $field['placeholder'] or  trans('forms.'.str_replace(' ','-',str_replace('_', ' ', $field['name']))) }}"
                       value="{{ (auth()->check() ? auth()->user()->{$field['name']} : old($field['name'])) }}">
            </div>

        @endforeach

    </div>

</div>