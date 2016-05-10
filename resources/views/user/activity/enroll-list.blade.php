@extends('layouts.master-user')

@section('content')
    <h2>@lang('user.my-enroll-list')</h2>
    <table class="ui table">
        <thead>
        <tr>
            <th>@lang('project.enroll-type')</th>
            <th>@lang('project.enroll-date')</th>
            <th>@lang('navbar.actions')</th>
        </tr>
        </thead>
        <tbody>
        @foreach($user->enrollers as $expenditure)
            <tr>
                <td colspan="3">
                    <h4>{{ $expenditure->project->name }}</h4>
                </td>
            </tr>
            <tr>
                <td>{{ $expenditure->expenditurable->name }}</td>
                <td>{{ $expenditure->pivot->created_at->format('m/d/Y H:i') }}</td>
                <td>

                    <form method="post" action="{{ route('project.unroll.store', $expenditure->id) }}">
                        {{ csrf_field() }}
                        <button type="submit" class="red ui icon button">@lang('project.unroll')</button>
                    </form>
                </td>
            </tr>
        @endforeach
        </tbody>

    </table>
@endsection