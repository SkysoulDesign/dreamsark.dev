@extends('layouts.master', ['class' => 'project-page'])

@section('content')

    @include('user.partials.header', ['header' => false])

    <div id="root" class="base-page__header --profile-pick" v-on:click="selectProfile">

        <div class="base-page__header__overlay"></div>

        <div id="wrapper" class="row align-middle +full-height +center">

            <div class="small-12 columns">
                <header class="header --inverted +text-shadow">
                    <small>Pick your position:</small>
                    <h1 class="+uppercase">@{{ position }}</h1>
                </header>
            </div>

            <div class="small-12 medium-3 small-order-2 medium-order-1 columns">

                <div class="row align-center">
                    @foreach(range(1,12) as $index)
                        <div class="columns project-page__palette">
                            <div class="project-page__palette__item" data-position="{{ $index }}">
                                {{ $index }}
                            </div>
                        </div>
                    @endforeach
                </div>

            </div>

            <div id="canvas" class="small-12 medium-6 small-order-1 medium-order-3 columns">
                <img src="{{ asset('img/temp/profile-1.png') }}" alt="">
            </div>

            <div class="small-12 medium-3 small-order-3 medium-order-4 columns">
                <div class="row">
                    @foreach(range(1,12) as $index)
                        <div class="columns project-page__palette">
                            <div class="project-page__palette__item" data-position="{{ $index }}">
                                {{ $index }}
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>

            <div class="small-12 small-order-1 medium-order-5 columns +center">
                <button id="selectProfile" class="button --secondary --fit">Select</button>
            </div>

        </div>

    </div>

    <form class="row align-center --overlapped +hidden" method="post" action="{{ route('user.profile.store', $profiles->first()->name) }}">

        {{ csrf_field() }}

        <div class="small-11 medium-9 columns form__header --rounded">
            this is a very nice form header
        </div>

        <div class="small-11 medium-9 columns form__content --rounded">

            <div class="row">

                @foreach($profiles->first()->questions as $index => $question)

                    <h3 class="small-12 columns form__step">
                        <span>{{ $index + 1 }}</span>
                        {{ $question->question }}
                    </h3>

                    <div class="small-12 columns form__field">
                        <input type="{{ $question->type->name }}" placeholder="{{ $question->question }}">
                    </div>

                @endforeach

                <div class="small-12 columns divider --simple"></div>

                <div class="small-12 columns form__field +center-on-mobile">
                    <button class="button --success --fit">Create Profile</button>
                </div>

                <div class="small-12 columns form__description +center-on-mobile">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi architecto consequuntur
                    deserunt dicta doloremque enim illum ipsam itaque iusto molestiae mollitia nihil quaerat, quas
                    sapiente similique, tempora! Aperiam, tempore!
                </div>

            </div>

        </div>

    </form>

@endsection


@section('pos-scripts')

    {{--<script src="{{ asset('js/profile.js') }}"></script>--}}
    <script>
        var profile = app.page(
                'profile',
                '#root',
                '.--profile-pick', 'project-page__palette__item',
                '#selectProfile', '#wrapper'
        );
    </script>

@endsection

{{--@section('content')--}}

{{--<div class="column">--}}

{{--<form class="ui form {{ !$errors->any() or "warning error" }}"--}}
{{--action="{{ route('user.profile.store', $profile->name) }}"--}}
{{--method="POST" enctype="multipart/form-data">--}}

{{--{{ csrf_field() }}--}}
{{--<input type="hidden" name="profile_id" value="{{ $profile->id }}"/>--}}

{{--<div class="ui tabular menu create-profile">--}}
{{--@foreach($sections as $index => $section)--}}
{{--<div class="{{ $index != 0 ?: "active" }} item" data-tab="tab-{{ $section->name }}">--}}
{{--{{ $section->name }}--}}
{{--</div>--}}
{{--@endforeach--}}
{{--</div>--}}

{{--@foreach($group = $profile->questions->groupBy('pivot.section.name') as $section => $questions)--}}

{{--<div class="ui bottom attached tab segment {{ $group->keys()[0] != $section ?:'active' }}"--}}
{{--data-tab="tab-{{ $section }}" style="min-height: 350px;">--}}

{{--@foreach($questions as $question)--}}

{{--@php--}}
{{--$attributes = '';--}}
{{--$type = $question->type->name or 'text';--}}
{{--$required = $question->pivot->required or false;--}}
{{--$questionIndex = $required ? 'required' : 'general';--}}
{{--$name = 'question_'.$question->id.'';--}}
{{--if(in_array($type, ['radio', 'checkbox', 'select'])){--}}
{{--$name .= '[]';--}}
{{--}--}}
{{--$value = old($name, (!in_array($type, ['radio', 'checkbox'])?'':[]));--}}

{{--$label = $question->question;--}}
{{--if($required && $type!='checkbox'){--}}
{{--$formValidateArr[$name] = ['identifier' => $name, 'rules' => [['type' => in_array($type, ['radio', 'checkbox']) ? 'checked' : 'empty']]];--}}
{{--if(in_array($type, ['file', 'image', 'video']))--}}
{{--$formValidateArr[$name]['optional'] = true;--}}
{{--}--}}
{{--$optionsArr = $question->options->pluck('cleanName', 'id')->toArray();--}}
{{--@endphp--}}

{{--@if($type=='select')--}}
{{--<div class="field {{ @$required?' required':'' }}">--}}
{{--<label>{{ $label }}</label>--}}
{{--<select class="ui dropdown" name="{{ $name }}">--}}
{{--<option value="">{{ $placeholder or $label }}</option>--}}
{{--@foreach($optionsArr as $key => $option)--}}
{{--<option {{ !empty($value) && in_array($key, $value) ? 'selected' : '' }} value="{{ $key }}">{{ $option }}</option>--}}
{{--@endforeach--}}
{{--</select>--}}
{{--</div>--}}
{{--@elseif(in_array($type, ['radio', 'checkbox']))--}}
{{--@include('partials.checkbox', ['parent_class' => 'grouped', 'default' => (is_array($value)?$value:[$value]), 'options' => $optionsArr])--}}
{{--@elseif($type=='textarea')--}}
{{--@include('partials.textarea', [])--}}
{{--@elseif(in_array($type, ['file', 'image', 'video']))--}}
{{--@php $attributes = ($type!='file' ? 'accept="'.$type.'/*"' : ''); @endphp--}}
{{--@include('partials.field-multiple', ['label' => $label, 'fields' => [--}}
{{--['name' => $name, 'type' => 'file', 'value' => $value, 'required' => boolval($required)],--}}
{{--], 'class' => 'two'])--}}
{{--@else--}}
{{--@include('partials.field', [])--}}
{{--@endif--}}

{{--@if(in_array($question->type->name, ['text', 'url', 'number', 'tel', 'search', 'email', 'range']))--}}

{{--<div class="field">--}}
{{--<label>{{ $question->question }}</label>--}}
{{--<input type="{{ $question->type->name }}"--}}
{{--name="question_{{ $question->id }}"--}}
{{--placeholder="{{ $question->question }}"--}}
{{--{{ !$question->pivot->required ?: "required" }} >--}}
{{--</div>--}}

{{--@endif--}}

{{--@if(in_array($question->type->name, ['checkbox']))--}}
{{--<div class="field">--}}

{{--@foreach($question->options as $option)--}}
{{--<div class="ui checkbox">--}}

{{--<input id="{{ $option->name }}"--}}
{{--name="question_{{$question->id}}[{{ $option->id }}]"--}}
{{--type="checkbox">--}}
{{--<label for="{{ $option->name }}">{{ $option->name }}</label>--}}

{{--</div>--}}

{{--@endforeach--}}

{{--</div>--}}
{{--@endif--}}

{{--@endforeach--}}

{{--</div>--}}

{{--@endforeach--}}

{{--<div class="ui actions">--}}
{{--<button class="ui submit button primary" type="submit">@lang('forms.create')</button>--}}

{{--<a href="{{ route('user.profile.index') }}" class="ui button ui-icon-cancel">--}}
{{--@lang('forms.cancel')--}}
{{--</a>--}}
{{--</div>--}}
{{--</form>--}}
{{--</div>--}}
{{--@endsection--}}

{{--@include('user.profile.scripts')--}}