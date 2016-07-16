@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

    @include('admin.partials.header')

    <div class="row">

        <div class="small-12 columns">

            <header class="header --light --with-divider --full">
                @lang('admin.project-list')
            </header>

        </div>

        <div class="small-12 columns">
            <table class="ui celled striped table">
                <thead>
                <tr>
                    <th>@lang('project.stage')</th>
                    <th>@lang('project.name')</th>
                    <th>@lang('project.reward')</th>
                    <th>@lang('project.vote-date')</th>
                    <th>@lang('project.status')</th>
                    <th>@lang('project.action')</th>
                </tr>
                </thead>
                <tbody>
                @forelse($projects as $project)
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
                            @elseif($project->type=='distribution')
                                <a href="javascript:;"
                                   class="ui {{ ($project->stage->active?'green':'brown') }} ribbon label">
                                    @lang('project.' . ($project->stage->active?'complete':$project->type))
                                </a>
                            @else
                                @lang('project.' . $project->type)
                            @endif
                        </td>
                        <td class="collapsing">{{ $project->name }}</td>
                        <td>{{ $project->stage->reward->amount or '-'}}</td>
                        <td>{{ $project->stage->vote->open_date or '-' }}</td>
                        <td>
                            @if(in_array(class_basename($project->stage), ['Idea', 'Synapse', 'Script', 'Distribution']))
                                @include('admin.partials.project.card-stages')
                            @endif

                            @if($project->stage instanceof \DreamsArk\Models\Project\Stages\Review)
                                @include('admin.partials.project.card-review')
                            @endif

                            @if($project->stage instanceof \DreamsArk\Models\Project\Stages\Fund)
                                @include('admin.partials.project.card-fund')
                            @endif
                        </td>

                        <td class="">
                            {{--@if($project->stage->submission)
                                <a href="{{ route('project.next.create', $project->id) }}" class="ui olive button">
                                    @lang('project.start-next-stage')
                                </a>
                            @endif--}}
                            @include('admin.partials.project.view-project-button', ['project_id' => $project->id])
                        </td>

                    </tr>
                @empty
                    <tr>
                        <th colspan="6" class="ui error message">
                            @lang('project.no-project')
                        </th>
                    </tr>
                @endforelse
                </tbody>
                @include('partials.paginate-links', ['resultSet' => $projects, 'colSpan' => 6])
            </table>
        </div>

    </div>


@endsection

