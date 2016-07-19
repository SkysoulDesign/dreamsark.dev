@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row">

        <div class="small-12 columns">
            <header class="header --centered">
                @lang('user.my-earning-list')
                <p>@lang('user.my-earning-list-description')</p>
            </header>
        </div>

        <div class="small-12 columns">

            <ul class="ul --inline --bold --right">
                <li class="li --active">
                    <a href="{{ route('user.activity.earning') }}">@lang('navbar.earning-list')</a>
                </li>
                <li>
                    <a href="{{ route('user.activity.enrolled.list') }}">@lang('navbar.enrolled-list')</a>
                </li>
                <li>
                    <a href="{{ route('user.activity.backed.list') }}">@lang('navbar.backed-list')</a>
                </li>
            </ul>

        </div>

        <div class="small-12 columns">

            <table class="table --stack">
                <thead>
                <tr>
                    <th>@lang('project.project')</th>
                    <th>@lang('project.type')</th>
                    <th>@lang('project.reward-amount')</th>
                    <th>@lang('project.earning-date')</th>
                </tr>
                </thead>
                <tbody>
                @forelse($projectEarnings as $projectEarning)
                    <tr>
                        <td>
                            <a href="{{ route('project.show', $projectEarning->submissible->project->id) }}">
                                {{ $projectEarning->submissible->project->name }}
                            </a>
                        </td>

                        <td>@lang("project.{$projectEarning->submissible->getStageName()}")</td>
                        <td>{{ $projectEarning->votes->pluck('pivot')->sum('amount') }}</td>
                        <td>{{ $projectEarning->submissible->updated_at->format('m/d/Y H:i A') }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4">
                            <div class="ui error">@lang('no-results')</div>
                        </td>
                    </tr>
                @endforelse
                </tbody>
                <tfoot>
                <tr>
                    <th colspan="2">
                        <div class="ui header">
                            @lang('user.total-earning', ['amount' => $earningTotal])
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
    </div>

@endsection
