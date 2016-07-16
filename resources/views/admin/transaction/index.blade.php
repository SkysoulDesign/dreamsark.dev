@extends('layouts.master')

@section('content')

    @include('admin.partials.header')

    <div class="row">

        <div class="small-12 columns">
            <header class="header --centered">
                Lorem ipsum dolor sit
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci delectus dicta dolores eaque
                    eveniet excepturi in laborum molestias nobis optio recusandae.</p>
            </header>
        </div>

        <div class="small-12 columns">

            <ul class="ul --inline --bold --right">
                <li class="li --active">
                    <a href="{{ route('admin.transaction.purchase', 'all') }}">@lang('transaction.purchase')</a>
                </li>
                <li>
                    <a href="#">@lang('transaction.withdraw')</a>
                </li>
            </ul>

        </div>

        <div class="small-12 columns">

            <table class="table --stack">
                <thead>
                <tr>
                    <th>@lang('forms.stage')</th>
                    <th>@lang('forms.name')</th>
                    <th>@lang('forms.reward')</th>
                    <th class="--compact +center">@lang('forms.action')</th>
                </tr>
                </thead>
                <tbody>
                {{--@foreach($projects as $project)--}}
                {{--<tr>--}}
                {{--<td>{{ $project->type }}</td>--}}
                {{--<td>{{ $project->name }}</td>--}}
                {{--<td>{{ $project->reward }}</td>--}}
                {{--<td class="table__action">--}}
                {{--<button class="button --small --primary">@lang('forms.view')</button>--}}
                {{--<button class="button --small --primary">@lang('forms.edit')</button>--}}
                {{--</td>--}}
                {{--</tr>--}}
                {{--@endforeach--}}
                </tbody>
            </table>
        </div>
    </div>

@endsection
