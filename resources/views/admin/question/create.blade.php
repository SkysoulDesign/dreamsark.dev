@extends('layouts.master-admin')

@section('content')
    @include('admin.partials.question-menu')

    <div class="ui segment">
        <form class="ui form warning error" action="{{ route('admin.question.store') }}" method="POST">

            {{ csrf_field() }}
            <h3>Create Question</h3>

            <div class="field">
                <label>Question</label>
                <input type="text" name="question" placeholder="e.g. what is your nickname?">
            </div>

            <div class="field">
                <label>Type</label>
                <select id="category" class="ui dropdown " name="category">
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="File">File</option>
                    <option value="checkbox">Checkbox</option>
                </select>
            </div>

            <button class="ui submit button primary" type="submit">Create</button>

            <a href="{{ route('admin.question.index') }}" class="ui button ui-icon-cancel">
                @lang('forms.cancel')
            </a>

        </form>
    </div>
@endsection

@section('pos-scripts')
    <script type="text/javascript" src="{{ asset('js/question-form.js') }}"></script>
@endsection