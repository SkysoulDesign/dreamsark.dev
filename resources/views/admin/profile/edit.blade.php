@extends('layouts.master-admin')

@section('content')
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
                       placeholder="@lang('forms.profile-name-lower')" readonly
                       value="{{ old('name', $profile->name) }}">
            </div>
            <div class="required field">
                <label>@lang('forms.display-name')</label>
                <input type="text"
                       name="display_name"
                       placeholder="@lang('forms.profile-name')"
                       value="{{ old('display_name', $profile->display_name) }}">
            </div>

            {{--@include('admin.profile.form-question')--}}

            <div class="fields grouped">

                <label>@lang('forms.select-questions')</label>

                @foreach($questions as $question)
                    <div class="field">
                        <div class="ui checkbox">
                            <select name="category[{{ $question->id }}]">
                                <option value="general">Category</option>
                                @foreach($category as $key => $value)
                                    <option value="{{ $key }}"{{ $question->category!=$key?:' selected' }}>{{ $value }}</option>
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
                                Required
                            </label>
                        </div>
                    </div>
                @endforeach

            </div>

            <button class="ui submit button primary" type="submit">Update</button>

            <a href="{{ route('admin.profile.index') }}" class="ui button ui-icon-cancel">
                @lang('forms.cancel')
            </a>

        </form>
    </div>
@endsection