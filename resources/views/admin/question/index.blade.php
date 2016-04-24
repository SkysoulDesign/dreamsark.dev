@extends('layouts.master-admin')

@section('content')

    @include('admin.partials.question-menu')

    <table class="ui selectable celled table">
        <thead>
        <tr>
            <th>@lang('forms.question')</th>
            <th>@lang('forms.category')</th>
            <th>@lang('forms.type')</th>
            <th>@lang('forms.action')</th>
        </tr>
        </thead>
        <tbody>
        @foreach($questions as $question)
            <tr>
                <td>{{ $question->question }}</td>
                <td>@lang('forms.'.$question->category)</td>
                <td>@lang('forms.'.$question->type)</td>

                <td class="">
                    <div class="ui small basic icon buttons">
                        <a class="ui button" href="{{ route('admin.question.edit', $question->id) }}">
                            <i class="edit icon"></i>
                            @lang('forms.edit')
                        </a>
                        <a class="ui button delete-item" href="{{ route('admin.question.destroy', $question->id) }}">
                            <i class="delete icon"></i>
                            @lang('forms.delete')
                        </a>
                    </div>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection