@extends('layouts.master-admin')

@section('content')

    @include('admin.partials.question-menu')

    <table class="ui selectable celled table">
        <thead>
        <tr>
            <th>Question</th>
            <th>Type</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        @foreach($questions as $question)
            <tr>
                <td>{{ $question->question }}</td>
                <td>{{ $question->type->present()->name }}</td>

                <td>
                    <div class="ui small basic icon buttons">
                        <a class="ui button" href="{{ route('admin.question.edit', $question->id) }}">
                            <i class="edit icon"></i>
                            Edit
                        </a>
                        <a class="ui button delete-item" href="{{ route('admin.question.destroy', $question->id) }}">
                            <i class="delete icon"></i>
                            Delete
                        </a>
                    </div>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection