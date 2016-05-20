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
        @foreach($distributions as $distribution)
            <tr>
                <td>{{ $distribution->project->name }}</td>
                <td>{{ $distribution->project->user->name ?:$distribution->project->user->username }}</td>
                <td>{{ $distribution->created_at->format('m/d/Y H:i A') }}</td>
                <td>
                    @include('admin.partials.project.view-project-button', ['project_id' => $distribution->project_id])
                    <a href="{{ route('committee.project.distribute.view', $distribution->id) }}" class="ui button">
                        <i class="settings icon"></i>
                        @lang('project.view-distribution')
                    </a>
                </td>
            </tr>
        @endforeach
        </tbody>
        @include('admin.partials.paginate-links', ['resultSet' => $distributions, 'colSpan' => 4])
    </table>
@endsection
@section('pos-scripts')
    @include('partials.embed-show-project-script')
@endsection