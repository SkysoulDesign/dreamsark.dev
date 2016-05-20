@extends('layouts.master-user')

@section('content')

    <div class="column">

        <div class="ui right aligned segment">

            <a href="{{ route('project.create') }}" class="ui primary button">
                @lang('project.start-project')
            </a>

        </div>

        <div class="ui pointing secondary tabular menu">
            <a class="item" data-tab="unpublished" style="display: none;">@lang('project.unpublished')</a>
            <a class="active item" data-tab="published">@lang('project.published')</a>
            <a class="item" data-tab="failed">@lang('project.failed')</a>
        </div>

        <div class="ui tab" data-tab="unpublished" style="display: none;">
            <table class="ui unstackable table">
                <thead>
                <tr>
                    <th>@lang('project.name')</th>
                    <th>@lang('project.reward')</th>
                    <th>@lang('project.vote-date')</th>
                    <th class="">@lang('project.action')</th>
                </tr>
                </thead>
                <tbody>
                @foreach($projects as $project)
                    <tr>
                        <td class="collapsing">{{ $project->name }}</td>
                        <td>${{ $project->reward or '-' }}</td>
                        <td>{{ $project->voting_date ? $project->voting_date->format('m/d/Y H:i') : '-' }}</td>

                        <td class="">
                            <form action="{{ route('project.publish', $project->id) }}">
                                <a href="{{ route('project.edit', $project->id) }}" class="ui primary button">
                                    @lang('project.edit')
                                </a>
                                <button type="submit" class="ui olive button">
                                    @lang('project.publish')
                                </button>
                            </form>

                        </td>

                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

        <div class="ui active tab" data-tab="published">
            <table class="ui unstackable table">
                <thead>
                <tr>
                    <th>@lang('project.stage')</th>
                    <th>@lang('project.name')</th>
                    <th>@lang('project.reward')</th>
                    <th>@lang('project.vote-date')</th>
                    <th>@lang('project.status')</th>
                    <th class="">@lang('project.action')</th>
                </tr>
                </thead>
                <tbody>
                @foreach($publishedProjects as $project)

                    <tr>
                        <td>
                            @if($project->type=='fund')
                                <a href="javascript:;" class="ui orange ribbon label">
                                    @lang('project.' . $project->type)
                                </a>
                            @elseif($project->type=='review')
                                <a href="javascript:;" class="ui pink ribbon label">
                                    @lang('project.' . $project->type)
                                </a>
                            @else
                                @lang('project.' . $project->type)
                            @endif
                        </td>
                        <td class="collapsing">{{ $project->name }}</td>
                        <td>{{ $project->stage->reward->amount or '-'}}</td>

                        <td>{{ $project->stage->vote ? ($project->stage->vote->open_date ? $project->stage->vote->open_date->format('m/d/Y H:i') : '-') : '-' }}</td>
                        <td>{{ $project->stage->submission ? 'Finished' : 'Waiting' }}</td>

                        <td class="">
                            @if($project->stage->submission)
                                <a href="{{ route('project.next.create', $project->id) }}" class="ui olive button">
                                    @lang('project.start-next-stage')
                                </a>
                            @endif
                            <a href="{{ route('project.show', $project->id) }}" class="ui primary button">
                                @lang('project.view')
                            </a>
                        </td>

                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

        <div class="ui tab" data-tab="failed">
            <table class="ui unstackable table">
                <thead>
                <tr>
                    <th>@lang('project.stage')</th>
                    <th>@lang('project.name')</th>
                    <th class="">@lang('project.action')</th>
                </tr>
                </thead>
                <tbody>
                @foreach($failedProjects as $project)
                    <tr>
                        <td>
                            @if($project->type=='fund')
                                <a href="javascript:;" class="ui orange ribbon label">
                                    @lang('project.' . $project->type)
                                </a>
                            @elseif($project->type=='review')
                                <a href="javascript:;" class="ui pink ribbon label">
                                    @lang('project.' . $project->type)
                                </a>
                            @else
                                @lang('project.' . $project->type)
                            @endif
                        </td>
                        <td>{{ $project->name }}</td>
                        <td class="">
                            <a href="{{ route('project.show', $project->id) }}" class="ui primary button">
                                @lang('project.view')
                            </a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

    </div>

@endsection