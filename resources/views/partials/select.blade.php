<div class="field {{ $parent_class or '' }} @if(@$errors && $errors->has($name)) error @endif{{ @$required?' required':'' }}">
    {{--*/ $label = isset($label)?$label:trans('forms.'.str_replace('_', ' ', $name)) /*--}}
    <label>{{ $label }}</label>
    <select @if(isset($id)) id="{{ $id }}" @endif class="ui dropdown {{ $class or '' }}" name="{{ $name }}">
        <option value="">{{ $placeholder or $label }}</option>
        @foreach($collection as $key => $value)
            <option {{ @$default!='' && $default == $key ? 'selected' : '' }} value="{{ $key }}">{{ trans((isset($translation) ? $translation :'forms').'.'.str_replace(' ', '-', strtolower($value))) }}</option>
            {{--{{ (auth()->check() ? auth()->user()->{$name} : old($name)) == $key ? 'selected' : '' }}--}}
        @endforeach
    </select>
</div>

