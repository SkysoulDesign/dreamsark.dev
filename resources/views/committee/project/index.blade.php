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
                    <a href="{{ route('project.show', $review->project_id) }}" class="ui button">
                        @lang('project.view')
                    </a>
                    <a href="{{ route('committee.project.staff.create', $review->id) }}" class="ui button">
                        <i class="add icon"></i>
                        @lang('project.review-and-plan')
                    </a>

                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection