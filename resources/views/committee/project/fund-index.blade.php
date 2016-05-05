@extends('layouts.master-admin')

@section('content')
    <h2>@lang('project.review-list')</h2>
    <table class="ui selectable celled table">
        <thead>
        <tr>
            <th>@lang('navbar.project')</th>
            <th>@lang('navbar.creator')</th>
            <th>@lang('navbar.actions')</th>
        </tr>
        </thead>
        <tbody>
        @foreach($funds as $fund)
            <tr>
                <td>{{ $fund->project->name }}</td>
                <td>{{ $fund->project->user->name ?:$fund->project->user->username }}</td>
                <td>
                    @include('admin.partials.project.view-project-button', ['project_id' => $fund->project_id])
                </td>
            </tr>
        @endforeach
        </tbody>
        @include('admin.partials.paginate-links', ['resultSet' => $funds, 'colSpan' => 3])
    </table>
@endsection
@section('pos-scripts')
    @include('partials.embed-show-project-script')
@endsection