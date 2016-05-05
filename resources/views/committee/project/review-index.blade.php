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
        @foreach($reviews as $review)
            <tr>
                <td>{{ $review->project->name }}</td>
                <td>{{ $review->project->user->name ?:$review->project->user->username }}</td>
                <td>
                    @include('admin.partials.project.view-project-button', ['project_id' => $review->project_id])
                    <a href="{{ route('committee.project.planning.manage', $review->id) }}" class="ui button">
                        <i class="settings icon"></i>
                        @lang('project.review-and-plan')
                    </a>
                </td>
            </tr>
        @endforeach
        </tbody>
        @include('admin.partials.paginate-links', ['resultSet' => $reviews, 'colSpan' => 3])
    </table>
@endsection
@section('pos-scripts')
    @include('partials.embed-show-project-script')
@endsection