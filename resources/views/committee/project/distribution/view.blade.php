@extends('layouts.master-admin')

@section('content')
    <div class="column">
        <div class="ui menu">
            <div class="header item">
                @lang('project.view-fund'):&nbsp;{{ $distribution->project->name }}
            </div>
            <div class="right menu">
                @include('admin.partials.project.view-project-button', ['project_id' => $distribution->project_id, 'class' => ' item'])
            </div>
        </div>
        <div class="ui segments">
            <div class="ui tabular top attached three item menu">
                <div class="active item" data-tab="project">
                    <i class="icon sitemap"></i>
                    @lang('project.plan-data')
                </div>
                <div class="item" data-tab="enroll">
                    <i class="icon users"></i>
                    @lang('project.enroll-list')
                </div>
                <div class="item" data-tab="backer">
                    <i class="icon money"></i>
                    @lang('project.backers')
                </div>
            </div>
            <div class="ui active bottom attached tab segment project-plan" data-tab="project">
                @include('committee.project.distribute.partials.project-plan', ['enrollable' => $distribution->project->enrollable, 'expensable' => $distribution->project->expensable])
            </div>
            <div class="ui tab bottom attached segment enroll-list" data-tab="enroll">
                @include('committee.project.distribute.partials.enroll-list', ['enrollable' => $distribution->project->enrollable])
            </div>
            <div class="ui tab bottom attached segment backer-list" data-tab="backer">
                @include('committee.project.distribute.partials.backer-list', ['backers' => $distribution->project->backers])
            </div>
        </div>
    </div>
@endsection

@section('pos-scripts')
    @include('partials.embed-show-project-script')
    <style>
        .tabular.menu i.icon {
            font-size: 2em;
        }
    </style>
@endsection