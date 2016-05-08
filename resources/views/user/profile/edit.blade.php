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
                @foreach($sections as $index => $section)
                    <div class="{{ $index != 0 ?: "active" }} item" data-tab="tab-{{ $section->name }}">
                        {{ $section->name }}
                    </div>
                @endforeach
            </div>


            @php
                $category=''; $active=true;
                $valueArr = old('questions', '');
                $formValidateArr = [];
            @endphp

            @foreach($group = $profile->questions->groupBy('pivot.section.name') as $section => $questions)

                <div class="ui bottom attached tab segment {{ $group->keys()[0] != $section ?:'active' }}"
                     data-tab="tab-{{ $section }}">

                    @foreach($questions as $question)
                        @php
                            $attributes = '';
                            $type = $question->type->name or 'text';
                            $required = $question->pivot->required or false;
                            $questionIndex = $required ? 'required' : 'general';
                            $name = 'question_'.$question->id.'';
                        $value = old($name, @$answers->first()->content);
                            if($type=='checkbox'){
                                $name .= '[]';
                        $value = old($name, @$answers->first()->content);
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
                </div>
            @endforeach

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