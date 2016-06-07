@extends('layouts.master-admin')

@section('content')
    <h2>@lang('project.fund-list')</h2>
    <table class="ui selectable celled table">
        <thead>
        <tr>
            <th>@lang('navbar.project')</th>
            <th>@lang('navbar.creator')</th>
            <th>@lang('navbar.created-date')</th>
            <th>@lang('navbar.actions')</th>
        </tr>
        </thead>
        <tbody>
        @foreach($funds as $fund)
            <tr>
                <td>{{ $fund->project->name }}</td>
                <td>{{ $fund->project->user->name ?:$fund->project->user->username }}</td>
                <td>{{ $fund->created_at->format('m/d/Y H:i A') }}</td>
                <td>
                    @include('admin.partials.project.view-project-button', ['project_id' => $fund->project_id])
                    <a href="{{ route('committee.project.fund.view', $fund->id) }}" class="ui button">
                        <i class="settings icon"></i>
                        @lang('project.view-fund')
                    </a>
                </td>
            </tr>
        @endforeach
        </tbody>
        @include('partials.paginate-links', ['resultSet' => $funds, 'colSpan' => 4])
    </table>
@endsection
@section('pos-scripts')
    @include('partials.embed-show-project-script')
@endsection