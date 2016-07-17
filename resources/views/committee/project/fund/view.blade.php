@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

    @include('committee.partials.header')

    <div class="row +margin-top +margin-bottom">
        <div class="small-12">
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
                @include('committee.project.fund.partials.project-plan', ['enrollable' => $fund->project->enrollable, 'expensable' => $fund->project->expensable])
            </div>
            <div class="ui tab bottom attached segment enroll-list" data-tab="enroll">
                @include('committee.project.fund.partials.enroll-list', ['enrollable' => $fund->project->enrollable])
            </div>
            <div class="ui tab bottom attached segment backer-list" data-tab="backer">
                @include('committee.project.fund.partials.backer-list', ['backers' => $fund->project->backers])
            </div>
        </div>
    </div>
        </div>
@endsection

@push('scripts')
    @include('partials.embed-show-project-script')
    <style>
        .tabular.menu i.icon {
            font-size: 2em;
        }
    </style>
@endpush
