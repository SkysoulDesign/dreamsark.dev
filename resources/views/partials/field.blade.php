<div class="field">
    <div class="field @if($errors->has($name)) error @endif">
        <label>{{ $label or trans('forms.'.str_replace('_', '-', $name)) }}</label>
        <input @if(isset($id)) id="{{ $id }}" @endif type="{{ $type or 'text' }}" name="{{ $name }}"
               placeholder="{{ $placeholder or trans('forms.'.str_replace('_', '-', $name)) }}"
               value="{{ (auth()->check() ? auth()->user()->{$name} : old($name)) }}">
    </div>
</div>