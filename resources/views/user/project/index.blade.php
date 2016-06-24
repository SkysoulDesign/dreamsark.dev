@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row">

        <section class="small-12">

            <ul class="section__nav --right">
                <li class="section__nav__item --active">
                    <a href="#">Published Projects</a>
                </li>
                <li class="section__nav__item">
                    <a href="#">Failed Projects</a>
                </li>
            </ul>

            @foreach(range(0,3) as $index)
                <div class="row project">

                    <div class="small-12 medium-4 columns project__cover">
                        <img src="{{ asset('img/temp/cover.jpeg') }}" alt="">
                    </div>

                    <div class="small-12 medium-8 columns project__header +center-on-mobile">
                        <h1>Disney: The Jungle Book</h1>

                        <div class="project__header__author">
                            <img src="{{ asset('img/avatar/male.png') }}" alt="">
                            by <a href="#">Microcosm Publishing</a>
                        </div>

                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi culpa fuga laborum molestiae officiis sunt veniam. Asperiores commodi consectetur distinctio eos ex excepturi fugiat laborum mollitia quasi, quis, quod ullam.</span>

                        <div class="project__progress">
                            <ark-progress value="{{ random_int(0, 100) }}"></ark-progress>
                        </div>

                        <ark-statistics>

                            <statistic-item data="50%">Founded</statistic-item>
                            <statistic-item data="24">Days Left</statistic-item>

                            <div class="small-12 medium-expand columns +align-right">
                                <a href="#" class="button --fit --hollow-primary +full-width-on-mobile">
                                    View Project
                                </a>
                            </div>

                        </ark-statistics>

                    </div>
                </div>
            @endforeach

        </section>

    </div>

@endsection

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