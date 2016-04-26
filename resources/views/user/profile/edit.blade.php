@extends('layouts.master-user')


@section('content')
    <div class="column">

        <form class="ui form @if($errors->any()) warning error @endif"
              action="{{ route('user.profile.update', $profile->name) }}"
              method="POST" enctype="multipart/form-data">
            {{ csrf_field() }}
            {{ method_field('patch') }}
            <input type="hidden" name="profile_id" value="{{ $profile->id }}"/>
            <div class="ui tabular menu create-profile">
                {{--*/ $active=true /*--}}
                @foreach($categories as $category)
                    <div class="@if($active){!! 'active ' !!}{{--*/ $active=false /*--}} @endif{!! 'item' !!}"
                         data-tab="{{ $category }}">@lang('forms.'.$category)</div>
                @endforeach
            </div>
            @php
                $category=''; $active=true;
                $valueArr = old('questions', '');
                $formValidateArr = [];
            @endphp

            @foreach($profile->questions as $question)
                @if($question->pivot->category!=$category)
                    @if($category!='')
                        {{--*/ $active=false /*--}}
                        {!! '</div>' !!}
                    @endif
                    {{--*/ $category = $question->pivot->category /*--}}
                    {!! '<div class="ui'.($active?' active':'').' tab segment" data-tab="'. $category .'" style="min-height: 350px;">' !!}
                @endif
                @php
                    $attributes = '';
                    $type = $question->type->name or 'text';
                    $required = $question->pivot->required or false;
                    $questionIndex = $required ? 'required' : 'general';
                    $name = 'questions['.$questionIndex.']['.$type.']['.$question->id.']';
                    $value = @$valueArr[$questionIndex][$type][$question->id]?:@$answers[$question->id]['content'];
                    if($type=='checkbox'){
                        $name .= '[]';
                        if(!is_array($value))
                            $value = json_decode($value);
                    }
                    $label = $question->question;
                    if($required && $type!='checkbox'){
                        $formValidateArr[$name] = ['identifier' => $name, 'rules' => [['type' => in_array($type, ['radio', 'checkbox']) ? 'checked' : 'empty']]];
                        if(in_array($type, ['file', 'image', 'video']))
                            $formValidateArr[$name]['optional'] = true;
                    }
                    $optionsArr = $question->options->pluck('cleanName', 'id')->toArray();
                @endphp

                @if($type=='select')
                    <div class="field {{ @$required?' required':'' }}">
                        <label>{{ $label }}</label>
                        <select class="ui dropdown" name="{{ $name }}">
                            <option value="">{{ $placeholder or $label }}</option>
                            @foreach($optionsArr as $key => $value)
                                <option {{ @$value!='' && $value == $key ? 'selected' : '' }} value="{{ $key }}">{{ $value }}</option>
                            @endforeach
                        </select>
                    </div>
                @elseif(in_array($type, ['radio', 'checkbox']))
                    @include('partials.checkbox', ['parent_class' => 'grouped', 'default' => (is_array($value)?$value:[$value]), 'options' => $optionsArr])
                @elseif($type=='textarea')
                    @include('partials.textarea', [])
                @elseif(in_array($type, ['file', 'image', 'video']))
                    @php $attributes = ($type!='file' ? 'accept="'.$type.'/*"' : ''); @endphp
                    @include('partials.field-multiple', ['label' => $label, 'fields' => [
                                ['name' => $name, 'type' => 'file', 'value' => $value, 'required' => boolval($required)],
                            ], 'class' => 'two'])
                @else
                    @include('partials.field', [])
                @endif
            @endforeach
            {!! '</div>' !!}

            <div class="ui actions">
                <button class="ui submit button primary" type="submit">@lang('forms.save')</button>

                <a href="{{ route('user.profile.index') }}" class="ui button ui-icon-cancel">
                    @lang('forms.cancel')
                </a>
            </div>
        </form>
    </div>
@endsection

@include('user.profile.scripts')