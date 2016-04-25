@extends('layouts.master-admin')

@section('content')
    @include('admin.partials.profile-menu')

    <div class="ui segment">

        <form class="ui form" action="{{ route('admin.profile.store') }}" method="POST">

            {{ csrf_field() }}

            <h3>Create Profile</h3>
            <div class="required field">
                <label>Name</label>
                <input type="text"
                       name="name"
                       placeholder="e.g. Actor">
            </div>
            <div class="required field">
                <label>Display Name</label>
                <input type="text"
                       name="display_name"
                       placeholder="Actor">
            </div>

            <div class="fields grouped">

                <label>Select Questions</label>

                @foreach($questions as $question)
                    <div class="field">

                        <div class="ui checkbox">
                            <input type="checkbox"
                                   id="{{ "required_$question->id" }}"
                                   name="required[]"
                                   value="{{ $question->id }}">
                            <label for="{{ "required_$question->id" }}">
                                Required
                            </label>
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

