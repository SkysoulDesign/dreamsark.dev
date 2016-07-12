@extends('layouts.master')

@section('content')

    <div class="column">

        @if($reports->isEmpty())
            <div class="ui negative message">
                <i class="close icon"></i>

                <div class="header">@lang('report.no-data')</div>

            </div>
        @else
            <table class="ui celled striped table">
                <thead>
                <tr>
                    <th colspan="4">@lang('report.reports')</th>
                </tr>
                </thead>
                <tbody>
                @foreach($reports as $report)
                    <tr>
                        <td class="collapsing">
                            <i class="folder icon"></i> {{ $report->type }}
                        </td>
                        <td><a href="{{ $report->url }}">{{ $report->url }}</a></td>
                        <td>{{ $report->feedback }}</td>
                        <td class="right aligned collapsing">{{ $report->created_at->diffForHumans() }}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        @endif
    </div>

@endsection