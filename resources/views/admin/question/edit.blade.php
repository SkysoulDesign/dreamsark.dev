@extends('layouts.master-admin')

@section('content')
    @include('admin.partials.question-menu')

    <div class="ui segment">
        <form class="ui form warning error" action="{{ route('admin.question.update', $question->id) }}" method="POST">

            {{ method_field('patch') }}
            {{ csrf_field() }}

            <div class="field">
                <label>Question</label>
                <input type="text" name="question" value="{{ $question->question }}">
            </div>

            <div class="field">
                <label>Type</label>
                <select id="question_type" class="ui dropdown" name="type">
                    @foreach($types as $type)
                        <option {{ $question->type->id !== $type->id ? : 'selected' }} value="{{ $type->id }}">
                            {{ $type->present()->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="field options_block">
                <label>Options</label>
                <select id="options" class="ui dropdown " name="options[]" multiple>
                    @foreach($options as $option)

                        <option {{ !in_array($option->id,$question->options->pluck('id')->toArray()) ? : 'selected' }} value="{{ $option->name }}">
                            {{ $option->cleanName }}
                        </option>
                    @endforeach
                </select>
            </div>

            <button class="ui submit button primary" type="submit">@lang('forms.save')</button>

            <a href="{{ route('admin.question.index') }}" class="ui button ui-icon-cancel">
                @lang('forms.cancel')
            </a>

        </form>
    </div>
@endsection

@section('pos-scripts')
    @include('admin.question.scripts')
@endsection