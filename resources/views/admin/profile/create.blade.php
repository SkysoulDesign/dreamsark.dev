@extends('layouts.master-admin')

@section('content')
    @include('admin.partials.profile-menu')

    <div class="ui segment">

        <form class="ui form" action="{{ route('admin.profile.store') }}" method="POST">

            {{ csrf_field() }}

            <h3>Create Profile</h3>
            <div class="required field">
                <label>@lang('forms.name')</label>
                <input type="text"
                       name="name"
                       placeholder="{{ trans('forms.profile-name-sample') }}">
            </div>
            <div class="required field">
                <label>@lang('forms.display-name')</label>
                <input type="text"
                       name="display_name"
                       placeholder="{{ trans('forms.display-name-sample') }}">
            </div>

            <div class="fields grouped">

                <label>@lang('forms.select-question')</label>

                @foreach($questions as $question)
                    <div class="field">
                        <div class="ui checkbox">
                            <select name="sections[{{ $question->id }}]">
                                @foreach($sections as $section)
                                    <option value="{{ $section->id }}">{{ ucwords($section->name) }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="ui checkbox">
                            <input type="checkbox"
                                   id="{{ "question_$question->id" }}"
                                   name="questions[]"
                                   value="{{ $question->id }}">
                            <label for="{{ "question_$question->id" }}">
                                {{ $question->question }}
                            </label>
                        </div>
                        <div class="ui checkbox">
                            <input type="checkbox"
                                   id="{{ "required_$question->id" }}"
                                   name="required[]"
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
@endsection

