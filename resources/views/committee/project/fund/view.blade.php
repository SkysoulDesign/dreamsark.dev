@extends('layouts.master-admin')

@section('content')
    <div class="column">
            <div class="ui menu">
                <div class="header item">
                    @lang('project.view-fund'):&nbsp;{{ $fund->project->name }}
                </div>
                <div class="right menu">
                    @include('admin.partials.project.view-project-button', ['project_id' => $fund->project_id, 'class' => ' item'])
                </div>
            </div>
            <div class="ui segments">
                <div class="ui segment project-plan">
                    @include('committee.project.fund.partials.project-plan', ['enrollable' => $fund->project->enrollable, 'expensable' => $fund->project->expensable])
                </div>
                <div class="ui segment enroll-list">
                    @include('committee.project.fund.partials.enroll-list', ['enrollable' => $fund->project->enrollable])
                </div>
                <div class="ui segment backer-list">
                    @include('committee.project.fund.partials.backer-list', ['backers' => $fund->project->backers])
                </div>
            </div>
    </div>
@endsection

@section('pos-scripts')
    @include('partials.embed-show-project-script')
@endsection