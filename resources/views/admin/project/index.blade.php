@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

    @include('admin.partials.header')

    <ark-nav color="white">
        <ark-item active url="#">All Projects</ark-item>
        <ark-item url="#">Failed Projects</ark-item>
    </ark-nav>

    <div class="row --fluid align-center +margin-top">

        <div class="small-10 columns segment --transparent">
            <ul class="ul --inline --right">
                <li class="li --start">
                    <header class="header --small">
                        @lang('project.project-list')
                    </header>
                </li>
                <li>
                    <ark-dropdown title="Project Stage" icon="video-camera">
                        <ark-dropdown-option>@lang('project.idea')</ark-dropdown-option>
                        <ark-dropdown-option>@lang('project.synapse')</ark-dropdown-option>
                        <ark-dropdown-option>@lang('project.script')</ark-dropdown-option>
                        <ark-dropdown-option>@lang('project.fund')</ark-dropdown-option>
                    </ark-dropdown>
                </li>
                <li>
                    <ark-dropdown title="Sort by" icon="sort-amount-desc">
                        <ark-dropdown-option>@lang('forms.date')</ark-dropdown-option>
                        <ark-dropdown-option>@lang('forms.reward')</ark-dropdown-option>
                        <ark-dropdown-option>@lang('forms.submissions')</ark-dropdown-option>
                        <ark-dropdown-option>@lang('forms.a-to-z')</ark-dropdown-option>
                    </ark-dropdown>
                </li>
            </ul>
        </div>

        <div class="small-10 columns">
            @foreach($projects as $project)
                <div class="item --hover">

                    <div class="small-1 columns item__image">
                        <img src="{{ asset('img/svg/person-flat.svg') }}" alt="">
                    </div>

                    <div class="small-3 columns">

                        <ul class="--tight">
                            <li>
                                <h4>
                                    <a href="#">{{ $project->name }}</a>
                                </h4>
                            </li>
                            <li class="li --sub-tittle">
                                @set($trans, trans("project.{$project->stage->getStageName()}"))
                                @lang('project.current-stage', ['stage' => "<b>$trans</b>"])
                            </li>
                        </ul>

                    </div>
                    <div class="small-4 columns">...</div>
                    <div class="small-3 columns">
                        <ark-statistics>
                            <statistic-item data="40" icon="star">Budget</statistic-item>
                            <statistic-item data="65" icon="users">Crew</statistic-item>
                            <statistic-item data="123" icon="comments">Comments</statistic-item>
                        </ark-statistics>
                    </div>
                    <div class="small-1 columns +center">
                        <ark-dropdown icon="cog" mode="icon" pop="center">
                            <ark-dropdown-option icon="eye">View</ark-dropdown-option>
                            <ark-dropdown-option icon="pie-chart">Statistics</ark-dropdown-option>
                            <ark-dropdown-option icon="pencil">Edit</ark-dropdown-option>
                            <ark-dropdown-option icon="wrench">Manage</ark-dropdown-option>
                            <ark-dropdown-option icon="times">delete</ark-dropdown-option>
                        </ark-dropdown>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="small-10 segment --transparent">
            <ark-pagination :data="{{ $projects->toJson() }}"></ark-pagination>
        </div>

    </div>

    {{--<div class="row">--}}

    {{--<div class="small-12 columns">--}}

    {{--<header class="header --light --with-divider --full">--}}
    {{--@lang('admin.project-list')--}}
    {{--</header>--}}

    {{--</div>--}}

    {{--<div class="small-12 columns">--}}
    {{--<table class="ui celled striped table">--}}
    {{--<thead>--}}
    {{--<tr>--}}
    {{--<th>@lang('project.stage')</th>--}}
    {{--<th>@lang('project.name')</th>--}}
    {{--<th>@lang('project.reward')</th>--}}
    {{--<th>@lang('project.vote-date')</th>--}}
    {{--<th>@lang('project.status')</th>--}}
    {{--<th>@lang('project.action')</th>--}}
    {{--</tr>--}}
    {{--</thead>--}}
    {{--<tbody>--}}
    {{--@forelse($projects as $project)--}}
    {{--<tr>--}}
    {{--<td>--}}
    {{--@if($project->type=='fund')--}}
    {{--<a href="javascript:;" class="ui orange ribbon label">--}}
    {{--@lang('project.' . $project->type)--}}
    {{--</a>--}}
    {{--@elseif($project->type=='review')--}}
    {{--<a href="javascript:;" class="ui pink ribbon label">--}}
    {{--@lang('project.' . $project->type)--}}
    {{--</a>--}}
    {{--@elseif($project->type=='distribution')--}}
    {{--<a href="javascript:;"--}}
    {{--class="ui {{ ($project->stage->active?'green':'brown') }} ribbon label">--}}
    {{--@lang('project.' . ($project->stage->active?'complete':$project->type))--}}
    {{--</a>--}}
    {{--@else--}}
    {{--@lang('project.' . $project->type)--}}
    {{--@endif--}}
    {{--</td>--}}
    {{--<td class="collapsing">{{ $project->name }}</td>--}}
    {{--<td>{{ $project->stage->reward->amount or '-'}}</td>--}}
    {{--<td>{{ $project->stage->vote->open_date or '-' }}</td>--}}
    {{--<td>--}}
    {{--@if(in_array(class_basename($project->stage), ['Idea', 'Synapse', 'Script', 'Distribution']))--}}
    {{--@include('admin.partials.project.card-stages')--}}
    {{--@endif--}}

    {{--@if($project->stage instanceof \DreamsArk\Models\Project\Stages\Review)--}}
    {{--@include('admin.partials.project.card-review')--}}
    {{--@endif--}}

    {{--@if($project->stage instanceof \DreamsArk\Models\Project\Stages\Fund)--}}
    {{--@include('admin.partials.project.card-fund')--}}
    {{--@endif--}}
    {{--</td>--}}

    {{--<td class="">--}}
    {{--@if($project->stage->submission)--}}
    {{--<a href="{{ route('project.next.create', $project->id) }}" class="ui olive button">--}}
    {{--@lang('project.start-next-stage')--}}
    {{--</a>--}}
    {{--@endif--}}
    {{--@include('admin.partials.project.view-project-button', ['project_id' => $project->id])--}}
    {{--</td>--}}

    {{--</tr>--}}
    {{--@empty--}}
    {{--<tr>--}}
    {{--<th colspan="6" class="ui error message">--}}
    {{--@lang('project.no-project')--}}
    {{--</th>--}}
    {{--</tr>--}}
    {{--@endforelse--}}
    {{--</tbody>--}}
    {{--@include('partials.paginate-links', ['resultSet' => $projects, 'colSpan' => 6])--}}
    {{--</table>--}}
    {{--</div>--}}

    {{--</div>--}}


@endsection

