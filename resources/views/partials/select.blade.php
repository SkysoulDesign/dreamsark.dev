<div class="field @if($errors->has($name)) error @endif">
    <label>{{ $label or trans('forms.'.str_replace('_', '-', $name)) }}</label>
    <select @if(isset($id)) id="{{ $id }}" @endif class="ui dropdown {{ $class or '' }}" name="{{ $name }}">
        <option value="">{{ $placeholder or trans('forms.'.str_replace('_', '-', $name)) }}</option>
        @foreach($collection as $key => $value)
            <option {{ (auth()->check() ? auth()->user()->{$name} : old($name)) == $key ? 'selected' : '' }} value="{{ $key }}">{{ trans((isset($translation) ? $translation :'forms').'.'.str_replace(' ', '-', strtolower($value))) }}</option>
        @endforeach
    </select>
</div>

