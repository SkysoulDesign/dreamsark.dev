<div class="field @if($errors->has($name)) error @endif">
    <label>{{ $label or trans('forms.'.str_replace('_', '-', $name)) }}</label>

    <div class="ui fluid search selection dropdown">
        <input @if(isset($id)) id="{{ $id }}" @endif type="hidden" name="{{ $name }}"
               value="{{ (auth()->check() ? auth()->user()->{$name} : old($name)) }}">
        <i class="dropdown icon"></i>

        <div class="default text">{{ $placeholder or trans('forms.'.str_replace('_', '-', $name)) }}</div>
        <div class="menu">
            @foreach($collection as $key => $value)
                <div class="item" data-value="{{ $key }}"><i
                            class="{{ $value[1] }}"></i>{{ trans('forms.'.strtolower(str_replace(' ','-',$value[0]))) }}
                </div>
            @endforeach
        </div>
    </div>
</div>