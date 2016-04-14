<div class="field {{ $parent_class or '' }}">
    <div class="field @if($errors->has($name)) error @endif">
        <label>{{ $label or trans('forms.'.str_replace('_', '-', $name)) }}</label>
        <textarea @if(isset($id)) id="{{ $id }}" @endif name="{{ $name }}"
                  placeholder="{{ $placeholder or trans('forms.'.str_replace('_', '-', $name)) }}"
                  >{{ @$value }}</textarea>
        {{--(auth()->check() ? auth()->user()->{$name} : old($name))--}}
    </div>
</div>