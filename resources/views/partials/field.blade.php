{{--*/ $isRequired = @$required && $required?' required':'' /*--}}
<div class="field {{ $parent_class or '' }}">
    <div class="field @if(@$errors && $errors->has($name)) error @endif{{ $isRequired }}">
        {{--*/ $label = isset($label)?$label:trans('forms.'.str_replace('_', ' ', $name)) /*--}}
        @if(!isset($displayLabel) || $displayLabel)
            <label>{{ $label }}</label>
        @endif
        <input {{ @$attributes }} @if(isset($id)) id="{{ $id }}" @endif type="{{ $type or 'text' }}" name="{{ $name }}"
               placeholder="{{ $placeholder or $label }}"
               value="{{ @$value }}">
    </div>
</div>