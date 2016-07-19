@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row">

        <div class="small-12 columns">
            <header class="header --centered">
                @lang('user.my-enroll-list')
                <p>@lang('user.my-earning-list-description')</p>
            </header>
        </div>

        <div class="small-12 columns">

            <ul class="ul --inline --bold --right">
                <li>
                    <a href="{{ route('user.activity.earning') }}">@lang('navbar.earning-list')</a>
                </li>
                <li class="li --active">
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
                    <th>@lang('project.enroll-type')</th>
                    <th>@lang('project.enroll-date')</th>
                    <th>@lang('navbar.actions')</th>
                </tr>
                </thead>
                <tbody>
                @forelse($enrollers as $expenditure)
                    <tr>
                        <td colspan="3">
                            <h4>{{ $expenditure->project->name }}</h4>
                        </td>
                    </tr>
                    <tr>
                        <td>{{ $expenditure->expenditurable->name }}</td>
                        <td>{{ $expenditure->pivot->created_at->format('m/d/Y H:i') }}</td>
                        <td>
                            @if($expenditure->project->stage instanceof \DreamsArk\Models\Project\Stages\Distribution)
                            @elseif($expenditure->project->stage instanceof \DreamsArk\Models\Project\Stages\Fund && $expenditure->project->stage->vote->active)
                            @else
                                <form method="post" action="{{ route('project.unroll.store', $expenditure->id) }}">
                                    {{ csrf_field() }}
                                    <button type="submit" class="red ui icon button">@lang('project.unroll')</button>
                                </form>
                            @endif
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3">
                            @lang('project.no-enroll-projects')
                        </td>
                    </tr>
                @endforelse
                </tbody>
                <tfoot>
                <tr>
                    <th colspan="3">
                        @php $url = route('user.activity.enrolled.list'); @endphp
                        <div class="ui right floated pagination menu">
                            <a href="{{ $pagination['current']<=1?'javascript:;':$url.'?page='.($pagination['current']-1) }}"
                               class="icon item">
                                <i class="left chevron icon"></i>
                            </a>
                            <div class="active item">{{ $pagination['current'] }}</div>
                            <a href="{{ $enrollers->isEmpty()?'javascript:;':$url.'?page='.($pagination['current']+1) }}"
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
