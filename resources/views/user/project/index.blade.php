@extends('layouts.master')

@section('content')

    <div class="column">

        <div class="ui right aligned segment">

            <a href="{{ route('project.create') }}" class="ui primary button">
                @lang('project.start-project')
            </a>

        </div>

        <div class="ui pointing secondary tabular menu">
            <a class="item active" data-tab="unpublished">@lang('project.unpublished')</a>
            <a class="item" data-tab="published">@lang('project.published')</a>
            <a class="item" data-tab="failed">@lang('project.failed')</a>
        </div>

        <div class="ui tab active" data-tab="unpublished">
            <table class="ui unstackable table">
                <thead>
                <tr>
                    <th>@lang('project.name')</th>
                    <th>@lang('project.description')</th>
                    <th>@lang('project.reward')</th>
                    <th>@lang('project.vote-date')</th>
                    <th class="right aligned">@lang('project.action')</th>
                </tr>
                </thead>
                <tbody>
                @foreach($projects as $project)
                    <tr>
                        <td class="collapsing">{{ $project->name }}</td>
                        <td>{{ $project->content or '-' }}</td>
                        <td>${{ $project->reward or '-' }}</td>
                        <td>{{ $project->voting_date or '-' }}</td>

                        <td class="right aligned">
                            <form action="{{ route('user.project.publish', $project->id) }}">
                                <a href="{{ route('user.project.edit', $project->id) }}" class="ui primary button">
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

        <div class="ui tab" data-tab="published">
            <table class="ui unstackable table">
                <thead>
                <tr>
                    <th>@lang('project.name')</th>
                    <th>@lang('project.stage')</th>
                    <th>@lang('project.description')</th>
                    <th>@lang('project.reward')</th>
                    <th>@lang('project.vote-date')</th>
                    <th>@lang('project.status')</th>
                    <th class="right aligned">@lang('project.action')</th>
                </tr>
                </thead>
                <tbody>
                @foreach($publishedProjects as $project)

                    <tr>
                        <td class="collapsing">{{ $project->name }}</td>
                        <td>@lang('project.' . $project->type)</td>
                        <td>{{ $project->stage->content or '-' }}</td>
                        <td>{{ $project->stage->reward or '-'}}</td>
                        <td>{{ $project->stage->vote->open_date or '-' }}</td>
                        <td>{{ $project->stage->submission ? 'Finished' : 'Waiting' }}</td>

                        <td class="right aligned">
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
                    <th>@lang('project.name')</th>
                    <th>@lang('project.stage')</th>
                    <th class="right aligned">@lang('project.action')</th>
                </tr>
                </thead>
                <tbody>
                @foreach($failedProjects as $project)
                    <tr>
                        <td>{{ $project->name }}</td>
                        <td>@lang('project.'.$project->type)</td>
                        <td class="right aligned">
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