<div class="field {{ $parent_class or '' }}">
    <div class="field @if($errors->has($name)) error @endif">
        <label>{{ $label or trans('forms.'.str_replace('_', '-', $name)) }}</label>
        <input @if(isset($id)) id="{{ $id }}" @endif type="{{ $type or 'text' }}" name="{{ $name }}"
               placeholder="{{ $placeholder or trans('forms.'.str_replace('_', '-', $name)) }}"
               value="{{ @$value }}">
    </div>
</div>