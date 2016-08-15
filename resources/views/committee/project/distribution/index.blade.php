@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

    @include('committee.partials.header')
    @include('committee.project.partials.navigation')

    <div class="row --fluid align-center +margin-top">

        @if($distributions->isEmpty())

            <div class="small-10 columns message --color-warning --large">
                There is no project at distribution stage
            </div>

        @else

            <div class="small-10 columns segment --transparent">
                <ul class="ul --inline --right">
                    <li class="li --start">
                        <div class="header --small">
                            @lang('project.distribution-list')
                        </div>
                    </li>
                    <li>
                        <ark-dropdown title="Sort by" icon="sort-amount-desc">
                            <ark-dropdown-option>@lang('forms.date')</ark-dropdown-option>
                            <ark-dropdown-option>@lang('forms.reward')</ark-dropdown-option>
                            <ark-dropdown-option>@lang('forms.submissions')</ark-dropdown-option>
                            <ark-dropdown-option>@lang('forms.a-to-z')</ark-dropdown-option>
                        </ark-dropdown>
                    </li>
                </ul>
            </div>

            <div class="small-10 columns">
                @each('committee.project.partials.fragments.distribution', $distributions, '$distribution')
            </div>

            <div class="small-10 columns segment --transparent">
                <ark-pagination :data="{{ $distributions->toJson() }}"></ark-pagination>
            </div>

        @endif

    </div>

@endsection


{{--@extends('layouts.master', ['class' => 'admin-page'])--}}

{{--@section('content')--}}

{{--@include('committee.partials.header')--}}

{{--<div class="row +margin-top +margin-bottom">--}}
{{--<div class="small-12">--}}
{{--<h2>@lang('project.fund-list')</h2>--}}
{{--<table class="ui selectable celled table">--}}
{{--<thead>--}}
{{--<tr>--}}
{{--<th>@lang('navbar.project')</th>--}}
{{--<th>@lang('navbar.creator')</th>--}}
{{--<th>@lang('navbar.created-date')</th>--}}
{{--<th>@lang('navbar.actions')</th>--}}
{{--</tr>--}}
{{--</thead>--}}
{{--<tbody>--}}
{{--@foreach($distributions as $distribution)--}}
{{--<tr>--}}
{{--<td>{{ $distribution->project->name }}</td>--}}
{{--<td>{{ $distribution->project->user->name ?:$distribution->project->user->username }}</td>--}}
{{--<td>{{ $distribution->created_at->format('m/d/Y H:i A') }}</td>--}}
{{--<td>--}}
{{--@include('admin.partials.project.view-project-button', ['project_id' => $distribution->project_id])--}}
{{--<a href="{{ route('committee.project.distribute.view', $distribution->id) }}"--}}
{{--class="ui button">--}}
{{--<i class="settings icon"></i>--}}
{{--@lang('project.view-distribution')--}}
{{--</a>--}}
{{--</td>--}}
{{--</tr>--}}
{{--@endforeach--}}
{{--</tbody>--}}
{{--@include('partials.paginate-links', ['resultSet' => $distributions, 'colSpan' => 4])--}}
{{--</table>--}}
{{--</div>--}}
{{--</div>--}}
{{--@endsection--}}

{{--@push('scripts')--}}
{{--@include('partials.embed-show-project-script')--}}
{{--@endpush--}}
