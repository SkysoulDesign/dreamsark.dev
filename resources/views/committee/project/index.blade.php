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
                    <a href="javascript:;" class="ui button view-modal"
                       id="view-modal-{{ $review->project_id }}"
                       data-modal="project-view-modal-{{ $review->project_id }}">
                        <i class="unhide icon"></i>
                        @lang('project.view')
                    </a>
                    <div id="project-view-modal-{{ $review->project_id }}" class="ui fullscreen modal">
                        <i class="close icon"></i>
                        <div class="ui embed" data-url="{{ route('project.show.iframe', $review->project_id) }}"
                             data-placeholder="{{ asset('dreamsark-assets/mini-header-bg.jpg') }}"
                             data-icon="right circle arrow">
                        </div>
                    </div>
                    <a href="{{ route('committee.project.planning.manage', $review->id) }}" class="ui button">
                        <i class="settings icon"></i>
                        @lang('project.review-and-plan')
                    </a>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection
@section('pos-scripts')
    @include('partials.embed-show-project-script')
@endsection