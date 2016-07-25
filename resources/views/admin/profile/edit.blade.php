@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

    @include('admin.partials.header')
    @include('admin.profile.partials.nav')

    <div class="row --fluid align-center +margin-top">

        @include('admin.profile.partials.actions', ['title' => trans('forms.edit-profile'), 'sortBy' => false])

        <div class="small-10 columns segment">

            <ark-form
                    :bind="{{ $profile->toJson() }}"
                    action="{{ route('admin.profile.update', $profile->name) }}"
                    method="patch">

                <ark-input name="name" label="Name"></ark-input>

                <div class="required field">
                    <label>@lang('forms.display-name')</label>
                    <input type="text"
                           name="display_name"
                           placeholder="@lang('forms.display-name-sample')"
                           value="{{ old('display_name', $profile->display_name) }}">
                </div>

                @include('admin.profile.form-question')

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

                <ark-button>Submit</ark-button>

            </ark-form>

        </div>

    </div>
@endsection
