@extends('layouts.master-user')

@section('content')
    <h2>@lang('user.my-backed-list')</h2>
    <table class="ui celled table">
        <thead>
        <tr>
            <th>@lang('project.project')</th>
            <th>@lang('project.amount')</th>
            <th>@lang('project.backed-date')</th>
        </tr>
        </thead>
        <tbody>
        @if(!$backers->isEmpty())

            @foreach($backers as $index => $backer)
                <tr>
                    <td>{{ $backer->name }}</td>
                    <td>{{ $backer->pivot->amount }}</td>
                    <td>{{ ($backer->pivot->updated_at->format('m/d/Y H:i:a')) }}</td>
                </tr>
            @endforeach
        @else
            <tr>
                <td colspan="3">
                    @lang('project.no-backed-projects')
                </td>
            </tr>
        @endif
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
@endsection
