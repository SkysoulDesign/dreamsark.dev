<div class="field {{ $parent_class or '' }}">
    <div class="field @if(@$errors && $errors->has($name)) error @endif{{ @$required?' required':'' }}">
        {{--*/ $label = isset($label)?$label:trans('forms.'.str_replace('_', ' ', $name)) /*--}}
        <label>{{ $label }}</label>
        <textarea @if(isset($id)) id="{{ $id }}" @endif name="{{ $name }}"
                  placeholder="{{ $placeholder or $label }}"
                  >{{ @$value }}</textarea>
        {{--(auth()->check() ? auth()->user()->{$name} : old($name))--}}
    </div>
</div>