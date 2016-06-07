@extends('layouts.master-user')

@section('content')
    @include('user.partials.navbar-left')
    <div class="twelve wide stretched column">
        <h2>@lang('user.my-enroll-list')</h2>
        <table class="ui celled table">
            <thead>
            <tr>
                <th>@lang('project.enroll-type')</th>
                <th>@lang('project.enroll-date')</th>
                <th>@lang('navbar.actions')</th>
            </tr>
            </thead>
            <tbody>
            @if(!$enrollers->isEmpty())
                @foreach($enrollers as $expenditure)
                    <tr>
                        <td colspan="3">
                            <h4>{{ $expenditure->project->name }}</h4>
                        </td>
                    </tr>
                    <tr>
                        <td>{{ $expenditure->expenditurable->name }}</td>
                        <td>{{ $expenditure->pivot->created_at->format('m/d/Y H:i') }}</td>
                        <td>

                            <form method="post" action="{{ route('project.unroll.store', $expenditure->id) }}">
                                {{ csrf_field() }}
                                <button type="submit" class="red ui icon button">@lang('project.unroll')</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            @else
                <tr>
                    <td colspan="3">
                        @lang('project.no-enroll-projects')
                    </td>
                </tr>
            @endif
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
@endsection