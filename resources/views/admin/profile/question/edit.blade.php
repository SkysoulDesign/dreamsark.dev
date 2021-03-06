@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

    @include('admin.partials.header')

    <div class="row">

        <div class="small-12 columns">
            @include('admin.partials.question-menu')

            <div class="ui segment">
                <form class="ui form warning error" action="{{ route('admin.profile.question.update', $question->id) }}"
                      method="POST">

                    {{ method_field('patch') }}
                    {{ csrf_field() }}

                    <div class="field">
                        <label>@lang('forms.question')</label>
                        <input type="text" name="question" value="{{ $question->question }}">
                    </div>

                    <div class="field">
                        <label>@lang('forms.question-type')</label>
                        <select id="question_type" class="ui dropdown" name="type">
                            @foreach($types as $type)
                                <option {{ $question->type->id !== $type->id ? : 'selected' }} value="{{ $type->id }}">
                                    {{ $type->present()->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="field options_block">
                        <label>@lang('forms.question-option')</label>
                        <select id="options" class="ui dropdown " name="options[]" multiple>
                            @foreach($options as $option)

                                <option {{ !in_array($option->id,$question->options->pluck('id')->toArray()) ? : 'selected' }} value="{{ $option->name }}">
                                    {{ $option->cleanName }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <button class="ui submit button primary" type="submit">@lang('forms.update')</button>

                    <a href="{{ route('admin.profile.question.index') }}" class="ui button ui-icon-cancel">
                        @lang('forms.cancel')
                    </a>

                </form>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    @include('admin.profile.question.scripts')
@endpush
