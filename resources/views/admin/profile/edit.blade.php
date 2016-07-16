@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

    @include('admin.partials.header')

    <div class="row">

        <div class="small-12 columns">

            @include('admin.partials.profile-menu')

            <div class="ui segment">
                <form class="ui form" action="{{ route('admin.profile.update', $profile->name) }}" method="POST">

                    {{ method_field('patch') }}
                    {{ csrf_field() }}

                    <h3>@lang('forms.edit-profile')</h3>
                    <div class="required field">
                        <label>@lang('forms.name')</label>
                        <input type="text"
                               name="name"
                               placeholder="@lang('forms.profile-name-sample')"
                               value="{{ old('name', $profile->name) }}">
                    </div>
                    <div class="required field">
                        <label>@lang('forms.display-name')</label>
                        <input type="text"
                               name="display_name"
                               placeholder="@lang('forms.display-name-sample')"
                               value="{{ old('display_name', $profile->display_name) }}">
                    </div>

                    {{--@include('admin.profile.form-question')--}}

                    <div class="fields grouped">

                        <label>@lang('forms.select-question')</label>

                        @foreach($questions as $question)

                            <div class="field">
                                <div class="ui checkbox">
                                    <select name="sections[{{ $question->id }}]">
                                        @foreach($sections as $section)
                                            <option value="{{ $section->id }}" {{ $question->section_id != $section->id ?: 'selected' }}>
                                                {{ ucwords($section->name) }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="ui checkbox">
                                    <input type="checkbox"
                                           id="{{ "question_$question->id" }}"
                                           name="questions[]"
                                           @if($question->selected) checked @endif
                                           value="{{ $question->id }}">
                                    <label for="{{ "question_$question->id" }}">
                                        {{ $question->question }}
                                    </label>
                                </div>
                                <div class="ui checkbox">
                                    <input type="checkbox"
                                           id="{{ "required_$question->id" }}"
                                           name="required[]"
                                           @if($question->required) checked @endif
                                           value="{{ $question->id }}">
                                    <label for="{{ "required_$question->id" }}">
                                        @lang('general.required')
                                    </label>
                                </div>
                            </div>
                        @endforeach

                    </div>

                    <button class="ui submit button primary" type="submit">@lang('forms.update')</button>

                    <a href="{{ route('admin.profile.index') }}" class="ui button ui-icon-cancel">
                        @lang('forms.cancel')
                    </a>

                </form>
            </div>
        </div>
    </div>
@endsection
