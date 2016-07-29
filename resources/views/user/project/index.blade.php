@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row --fluid align-center +margin-top +color-black">

        <div class="small-10 columns segment --transparent">
            <ul class="ul --inline --right">
                <li class="li --start">
                    <header class="header --small">
                        @lang('project.my-projects')
                    </header>
                </li>
                <li>
                    <ark-nav basic>
                        <ark-tab content="tab-running-project" active>
                            Running Projects ({{ $projects->count() }})

                            @push('tab-item')
                            <div id="tab-running-project" class="small-10 columns">
                                @forelse($projects as $project)
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
                                                    Current stage: <b>{{ $project->stage->getStageName() }}</b>
                                                </li>
                                            </ul>

                                        </div>

                                        <div class="columns">
                                            <ark-statistics>
                                                <statistic-item data="{{ $project->stage->submissions->count() }}"
                                                                icon="star">Submissions
                                                </statistic-item>
                                                <statistic-item data="{{ $project->stage->comments->count() }}"
                                                                icon="comments">Comments
                                                </statistic-item>
                                            </ark-statistics>
                                        </div>

                                        @if($project->stage->submission)
                                            <div class="small-2 columns +center">
                                                <ark-button href="{{ route('project.next.create', $project) }}"
                                                            color="success">
                                                    @lang('project.start-next-stage')
                                                </ark-button>
                                            </div>
                                        @else
                                            <div class="small-1 columns +center">
                                                <ark-dropdown icon="cog" mode="icon" pop="center">
                                                    <ark-dropdown-option href="{{ route('project.show', $project) }}"
                                                                         icon="eye">View
                                                    </ark-dropdown-option>
                                                    <ark-dropdown-option icon="pencil">Edit</ark-dropdown-option>
                                                    <ark-dropdown-option icon="wrench">Manage</ark-dropdown-option>
                                                </ark-dropdown>
                                            </div>
                                        @endif

                                    </div>
                                @empty
                                    <div class="item columns message --color-warning ">
                                        You still don't have any running project...
                                        <b>
                                            <a href="{{ route('user.project.create') }}">why don't you start one?</a>
                                        </b>
                                    </div>
                                @endforelse
                            </div>
                            @endpush

                        </ark-tab>
                        <ark-tab content="tab-failed-project">
                            Failed Projects ({{ $failed_projects->count() }})
                            @push('tab-item')
                            <div id="tab-failed-project" class="small-10 columns">

                                @forelse($failed_projects as $project)
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
                                                    Current stage: <b>{{ $project->stage->getStageName() }}</b>
                                                </li>
                                            </ul>

                                        </div>

                                        <div class="columns">
                                            <ark-statistics>
                                                {{--<statistic-item data="{{ $project->stage->submissions->count() }}"--}}
                                                {{--icon="star">Submissions--}}
                                                {{--</statistic-item>--}}
                                                {{--<statistic-item data="{{ $project->stage->comments->count() }}"--}}
                                                {{--icon="comments">Comments--}}
                                                {{--</statistic-item>--}}
                                            </ark-statistics>
                                        </div>

                                        @if($project->stage->submission)
                                            <div class="small-2 columns +center">
                                                <ark-button href="{{ route('project.next.create', $project) }}"
                                                            color="success">
                                                    @lang('project.start-next-stage')
                                                </ark-button>
                                            </div>
                                        @else
                                            <div class="small-1 columns +center">
                                                <ark-dropdown icon="cog" mode="icon" pop="center">
                                                    <ark-dropdown-option icon="eye">Review</ark-dropdown-option>
                                                    <ark-dropdown-option icon="paper-plane">Publish
                                                    </ark-dropdown-option>
                                                </ark-dropdown>
                                            </div>
                                        @endif

                                    </div>
                                @empty
                                    <div class="item columns message --color-success">
                                        You don't have any failed project :)
                                    </div>
                                @endforelse
                            </div>
                            @endpush
                        </ark-tab>
                    </ark-nav>
                </li>
            </ul>
        </div>

        @stack('tab-item')


    </div>

    {{--<div class="row">--}}

    {{--<div class="small-12 columns">--}}
    {{--<header class="header --centered">--}}
    {{--@lang('project.project-title')--}}
    {{--<p>@lang('project.project-description')</p>--}}
    {{--</header>--}}
    {{--</div>--}}

    {{--<div class="small-12 columns">--}}

    {{--<ul class="ul --inline --bold --right">--}}
    {{--<li class="li --active">--}}
    {{--<a href="#">@lang('project.published')</a>--}}
    {{--</li>--}}
    {{--<li>--}}
    {{--<a href="#">@lang('project.failed')</a>--}}
    {{--</li>--}}
    {{--<li>--}}
    {{--<a class="button --primary --medium" href="{{ route('user.project.create') }}">--}}
    {{--@lang('forms.create-project')--}}
    {{--</a>--}}
    {{--</li>--}}
    {{--</ul>--}}

    {{--</div>--}}

    {{--<div class="small-12 columns">--}}

    {{--<table class="table --stack">--}}
    {{--<thead>--}}
    {{--<tr>--}}
    {{--<th>@lang('forms.stage')</th>--}}
    {{--<th>@lang('forms.name')</th>--}}
    {{--<th>@lang('forms.reward')</th>--}}
    {{--<th class="--compact +center">@lang('forms.action')</th>--}}
    {{--</tr>--}}
    {{--</thead>--}}
    {{--<tbody>--}}
    {{--@foreach($projects as $project)--}}
    {{--<tr>--}}
    {{--<td>{{ $project->type }}</td>--}}
    {{--<td>{{ $project->name }}</td>--}}
    {{--<td>{{ $project->reward }}</td>--}}
    {{--<td class="table__action">--}}
    {{--@if($project->stage->submission)--}}
    {{--<a href="{{ route('project.next.create', $project) }}" class="ui olive button">--}}
    {{--@lang('project.start-next-stage')--}}
    {{--</a>--}}
    {{--@endif--}}
    {{--<a href="{{ route('project.show', $project) }}"--}}
    {{--class="button --small --primary">@lang('forms.view')</a>--}}
    {{--<button class="button --small --primary">@lang('forms.edit')</button>--}}
    {{--</td>--}}
    {{--</tr>--}}
    {{--@endforeach--}}
    {{--</tbody>--}}
    {{--</table>--}}
    {{--</div>--}}
    {{--</div>--}}

@endsection





{{--@foreach($projects as $project)--}}

{{--<div class="row project">--}}

{{--<div class="small-12 medium-4 columns project__cover">--}}
{{--<img src="{{ asset('img/temp/cover.jpeg') }}" alt="">--}}
{{--</div>--}}

{{--<div class="small-12 medium-8 columns project__header +center-on-mobile">--}}
{{--<h1>Disney: The Jungle Book</h1>--}}

{{--<div class="project__header__author">--}}
{{--<img src="{{ asset('img/avatar/male.png') }}" alt="">--}}
{{--by <a href="#">Microcosm Publishing</a>--}}
{{--</div>--}}

{{--<span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi culpa fuga laborum molestiae officiis sunt veniam. Asperiores commodi consectetur distinctio eos ex excepturi fugiat laborum mollitia quasi, quis, quod ullam.</span>--}}

{{--<div class="project__progress">--}}
{{--<ark-progress value="{{ random_int(0, 100) }}"></ark-progress>--}}
{{--</div>--}}

{{--<ark-statistics>--}}

{{--<statistic-item data="50%">Founded</statistic-item>--}}
{{--<statistic-item data="24">Days Left</statistic-item>--}}

{{--<div class="small-12 medium-expand columns +align-right">--}}
{{--<a href="#" class="button --fit --hollow-primary +full-width-on-mobile">--}}
{{--View Project--}}
{{--</a>--}}
{{--</div>--}}

{{--</ark-statistics>--}}

{{--</div>--}}
{{--</div>--}}

{{--@endforeach--}}


{{--@section('content')--}}

{{--<div class="column">--}}

{{--<div class="ui right aligned segment">--}}

{{--<a href="{{ route('project.create') }}" class="ui primary button">--}}
{{--@lang('project.start-project')--}}
{{--</a>--}}

{{--</div>--}}

{{--<div class="ui pointing secondary tabular menu">--}}
{{--<a class="item" data-tab="unpublished" style="display: none;">@lang('project.unpublished')</a>--}}
{{--<a class="active item" data-tab="published">@lang('project.published')</a>--}}
{{--<a class="item" data-tab="failed">@lang('project.failed')</a>--}}
{{--</div>--}}

{{--<div class="ui tab" data-tab="unpublished" style="display: none;">--}}
{{--<table class="ui unstackable table">--}}
{{--<thead>--}}
{{--<tr>--}}
{{--<th>@lang('project.name')</th>--}}
{{--<th>@lang('project.reward')</th>--}}
{{--<th>@lang('project.vote-date')</th>--}}
{{--<th class="">@lang('project.action')</th>--}}
{{--</tr>--}}
{{--</thead>--}}
{{--<tbody>--}}
{{--@foreach($projects as $project)--}}
{{--<tr>--}}
{{--<td class="collapsing">{{ $project->name }}</td>--}}
{{--<td>${{ $project->reward or '-' }}</td>--}}
{{--<td>{{ $project->voting_date ? $project->voting_date->format('m/d/Y H:i') : '-' }}</td>--}}

{{--<td class="">--}}
{{--<form action="{{ route('project.publish', $project->id) }}">--}}
{{--<a href="{{ route('project.edit', $project->id) }}" class="ui primary button">--}}
{{--@lang('project.edit')--}}
{{--</a>--}}
{{--<button type="submit" class="ui olive button">--}}
{{--@lang('project.publish')--}}
{{--</button>--}}
{{--</form>--}}

{{--</td>--}}

{{--</tr>--}}
{{--@endforeach--}}
{{--</tbody>--}}
{{--</table>--}}
{{--</div>--}}

{{--<div class="ui active tab" data-tab="published">--}}
{{--<table class="ui unstackable table">--}}
{{--<thead>--}}
{{--<tr>--}}
{{--<th>@lang('project.stage')</th>--}}
{{--<th>@lang('project.name')</th>--}}
{{--<th>@lang('project.reward')</th>--}}
{{--<th>@lang('project.vote-date')</th>--}}
{{--<th>@lang('project.status')</th>--}}
{{--<th class="">@lang('project.action')</th>--}}
{{--</tr>--}}
{{--</thead>--}}
{{--<tbody>--}}
{{--@foreach($publishedProjects as $project)--}}

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
{{--@else--}}
{{--@lang('project.' . $project->type)--}}
{{--@endif--}}
{{--</td>--}}
{{--<td class="collapsing">{{ $project->name }}</td>--}}
{{--<td>{{ $project->stage->reward->amount or '-'}}</td>--}}

{{--<td>{{ $project->stage->vote ? ($project->stage->vote->open_date ? $project->stage->vote->open_date->format('m/d/Y H:i') : '-') : '-' }}</td>--}}
{{--<td>{{ $project->stage->submission ? 'Finished' : 'Waiting' }}</td>--}}

{{--<td class="">--}}
{{--@if($project->stage->submission)--}}
{{--<a href="{{ route('project.next.create', $project->id) }}" class="ui olive button">--}}
{{--@lang('project.start-next-stage')--}}
{{--</a>--}}
{{--@endif--}}
{{--<a href="{{ route('project.show', $project->id) }}" class="ui primary button">--}}
{{--@lang('project.view')--}}
{{--</a>--}}
{{--</td>--}}

{{--</tr>--}}
{{--@endforeach--}}
{{--</tbody>--}}
{{--</table>--}}
{{--</div>--}}

{{--<div class="ui tab" data-tab="failed">--}}
{{--<table class="ui unstackable table">--}}
{{--<thead>--}}
{{--<tr>--}}
{{--<th>@lang('project.stage')</th>--}}
{{--<th>@lang('project.name')</th>--}}
{{--<th class="">@lang('project.action')</th>--}}
{{--</tr>--}}
{{--</thead>--}}
{{--<tbody>--}}
{{--@foreach($failedProjects as $project)--}}
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
{{--@else--}}
{{--@lang('project.' . $project->type)--}}
{{--@endif--}}
{{--</td>--}}
{{--<td>{{ $project->name }}</td>--}}
{{--<td class="">--}}
{{--<a href="{{ route('project.show', $project->id) }}" class="ui primary button">--}}
{{--@lang('project.view')--}}
{{--</a>--}}
{{--</td>--}}
{{--</tr>--}}
{{--@endforeach--}}
{{--</tbody>--}}
{{--</table>--}}
{{--</div>--}}

{{--</div>--}}

{{--@endsection--}}
