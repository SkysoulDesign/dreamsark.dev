@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

        @include('admin.partials.header')
        @include('admin.profile.partials.nav');



        <div class="row">

            <div class="small-12 columns">
                @include('admin.partials.question-menu')

                <table class="ui selectable celled table">
                    <thead>
                    <tr>
                        <th>@lang('forms.question')</th>
                        <th>@lang('forms.question-type')</th>
                        <th>@lang('forms.action')</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($questions as $question)
                        <tr>
                            <td>{{ $question->question }}</td>
                            <td>{{ $question->type->present()->name }}</td>

                            <td>
                                <div class="ui small basic icon buttons">
                                    <a class="ui button"
                                       href="{{ route('admin.profile.question.edit', $question->id) }}">
                                        <i class="edit icon"></i>
                                        @lang('forms.edit')
                                    </a>
                                    <a class="ui button delete-item"
                                       href="{{ route('admin.profile.question.destroy', $question->id) }}">
                                        <i class="delete icon"></i>
                                        @lang('forms.delete')
                                    </a>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                    @include('partials.paginate-links', ['resultSet' => $questions, 'colSpan' => 3])
                </table>
            </div>
        </div>
@endsection
