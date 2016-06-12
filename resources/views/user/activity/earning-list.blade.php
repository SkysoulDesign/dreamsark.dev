@extends('layouts.master-user')

@section('content')
    @include('user.partials.navbar-left')
    <div class="twelve wide stretched column">
        <h2>@lang('user.my-earning-list')</h2>
        <table class="ui celled table">
            <thead>
            <tr>
                <th>@lang('project.project')</th>
                <th>@lang('project.type')</th>
                <th>@lang('project.reward-amount')</th>
                <th>@lang('project.earning-date')</th>
            </tr>
            </thead>
            @if(!$projectEarnings->isEmpty())
                @foreach($projectEarnings as $projectEarning)
                    <tr>
                        <td>
                            {{ $projectEarning->submissible->project->name }}
                            <div class="ui label teal">
                                <a href="{{ route('project.show', $projectEarning->submissible->project->id) }}">
                                    <i class="unhide icon black"></i>
                                </a>
                            </div>
                        </td>
                        <td>{{ class_basename($projectEarning->submissible_type) }}</td>
                        <td>{{ $projectEarning->votes->pluck('pivot')->sum('amount') }}</td>
                        <td>{{ $projectEarning->submissible->updated_at->format('m/d/Y H:i A') }}</td>
                    </tr>
                @endforeach

            @else
                <tr>
                    <td colspan="4">
                        <div class="ui error">@lang('no-results')</div>
                    </td>
                </tr>
            @endif
            <tfoot>
            <tr>
                <th colspan="2">
                    <div class="ui header">
                        @lang('user.total-earning'):&nbsp;{{ $earningTotal }}
                    </div>
                </th>
                <th colspan="2">
                    @php $url = route('user.activity.earning'); @endphp
                    <div class="ui right floated pagination menu">
                        <a href="{{ $pagination['current']<=1?'javascript:;':$url.'?page='.($pagination['current']-1) }}"
                           class="icon item">
                            <i class="left chevron icon"></i>
                        </a>
                        <div class="active item">{{ $pagination['current'] }}</div>
                        <a href="{{ $projectEarnings->isEmpty()?'javascript:;':$url.'?page='.($pagination['current']+1) }}"
                           class="icon item">
                            <i class="right chevron icon"></i>
                        </a>
                    </div>
                </th>
            </tr>
            </tfoot>
        </table>
    </div>
@endsection

