@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row">

        <div class="small-12 columns">
            <header class="header --centered">
                @lang('user.my-backed-list')
                <p>@lang('user.my-backed-list-description')</p>
            </header>
        </div>

        <div class="small-12 columns">

            <ul class="ul --inline --bold --right">
                <li>
                    <a href="{{ route('user.activity.earning') }}">@lang('navbar.earning-list')</a>
                </li>
                <li>
                    <a href="{{ route('user.activity.enrolled.list') }}">@lang('navbar.enrolled-list')</a>
                </li>
                <li class="li --active">
                    <a href="{{ route('user.activity.backed.list') }}">@lang('navbar.backed-list')</a>
                </li>
            </ul>

        </div>

        <div class="small-12 columns">

            <table class="table --stack">
                <thead>
                <tr>
                    <th>@lang('project.project')</th>
                    <th>@lang('project.amount')</th>
                    <th>@lang('project.backed-date')</th>
                </tr>
                </thead>
                <tbody>
                @forelse($backers as $index => $backer)
                    <tr>
                        <td>{{ $backer->name }}</td>
                        <td>{{ $backer->pivot->amount }}</td>
                        <td>{{ ($backer->pivot->updated_at->format('m/d/Y H:i:a')) }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3">
                            @lang('project.no-backed-projects')
                        </td>
                    </tr>
                @endforelse
                </tbody>
                <tfoot>
                <tr>
                    <th colspan="3">
                        @php $url = route('user.activity.backed.list'); @endphp
                        <div class="ui right floated pagination menu">
                            <a href="{{ $pagination['current']<=1?'javascript:;':$url.'?page='.($pagination['current']-1) }}"
                               class="icon item">
                                <i class="left chevron icon"></i>
                            </a>
                            <div class="active item">{{ $pagination['current'] }}</div>
                            <a href="{{ $backers->isEmpty()?'javascript:;':$url.'?page='.($pagination['current']+1) }}"
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
