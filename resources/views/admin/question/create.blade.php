@extends('layouts.master-admin')

@section('content')
    @include('admin.partials.question-menu')

    <div class="ui segment">
        <form class="ui form warning error" action="{{ route('admin.question.store') }}" method="POST">

            {{ csrf_field() }}

            <h3>@lang('forms.create-question')</h3>

            <div class="field">
                <label>@lang('forms.question')</label>
                <input type="text" name="question" placeholder="{{ trans('forms.question-sample') }}">
            </div>

            <div class="field">
                <label>@lang('forms.question-type')</label>
                <select id="question_type" class="ui dropdown " name="type">
                    @foreach($types as $type)
                        <option value="{{ $type->id }}">{{ $type->display_name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="field options_block">
                <label>@lang('forms.question-option')</label>
                <select id="options" class="ui dropdown " name="options[]" multiple>
                    @foreach($options as $option)
                        <option value="{{ $option->name }}">{{ $option->cleanName }}</option>
                    @endforeach
                </select>
            </div>

            <button class="ui submit button primary" type="submit">@lang('forms.create')</button>

            <a href="{{ route('admin.question.index') }}" class="ui button ui-icon-cancel">
                @lang('forms.cancel')
            </a>

        </form>
    </div>
@endsection

@section('pos-scripts')
    @include('admin.question.scripts')
@endsection