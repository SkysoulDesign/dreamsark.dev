@extends('layouts.master-user')

@section('content')
    <h2>@lang('user.my-backed-list')</h2>
    @if(!$user->backers->isEmpty())
        <table class="ui table">
            <thead>
            <tr>
                <th>@lang('project.project')</th>
                <th>@lang('project.amount')</th>
                <th>@lang('project.backed-date')</th>
            </tr>
            </thead>
            <tbody>
            @foreach($user->backers as $index => $backer)
                <tr>
                    <td>{{ $backer->name }}</td>
                    <td>{{ $backer->pivot->amount }}</td>
                    <td>{{ ($backer->pivot->updated_at->format('m/d/Y H:i:a')) }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    @else
        @lang('project.no-backed-projects')
    @endif
@endsection
