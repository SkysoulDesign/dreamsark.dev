@extends('layouts.master-user')

@section('content')

    <div class="column">

        <form class="ui form {{ !$errors->any() or "warning error" }}"
              action="{{ route('user.profile.store', $profile->name) }}"
              method="POST" enctype="multipart/form-data">

            {{ csrf_field() }}

            <div class="ui tabular menu create-profile">
                @foreach($sections as $index => $section)
                    <div class="{{ $index != 0 ?: "active" }} item" data-tab="tab-{{ $section->name }}">
                        {{ $section->name }}
                    </div>
                @endforeach
            </div>

            @foreach($group = $profile->questions->groupBy('pivot.section.name') as $section => $questions)

                <div class="ui bottom attached tab segment {{ $group->keys()[0] != $section ?:'active' }}"
                     data-tab="tab-{{ $section }}">

                    @foreach($questions as $question)

                        @if(in_array($question->type->name, ['text', 'url', 'number', 'tel', 'search', 'email', 'range']))

                            <div class="field">
                                <label>{{ $question->question }}</label>
                                <input type="{{ $question->type->name }}"
                                       name="question_{{ $question->id }}"
                                       placeholder="{{ $question->question }}"
                                        {{ !$question->pivot->required ?: "required" }} >
                            </div>

                        @endif

                        @if(in_array($question->type->name, ['checkbox']))
                            <div class="field">

                                @foreach($question->options as $option)
                                    <div class="ui checkbox">

                                        <input id="{{ $option->name }}"
                                               name="question_{{$question->id}}[{{ $option->id }}]"
                                               type="checkbox">
                                        <label for="{{ $option->name }}">{{ $option->name }}</label>

                                    </div>

                                @endforeach

                            </div>
                        @endif

                    @endforeach

                </div>

            @endforeach

            <div class="ui actions">
                <button class="ui submit button primary" type="submit">@lang('forms.create')</button>

                <a href="{{ route('user.profile.index') }}" class="ui button ui-icon-cancel">
                    @lang('forms.cancel')
                </a>
            </div>
        </form>
    </div>
@endsection

@include('user.profile.scripts')