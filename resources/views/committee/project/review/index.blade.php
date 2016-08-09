@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

    @include('committee.partials.header')
    @include('committee.project.partials.navigation')

    <div class="row --fluid align-center +margin-top">

        <div class="small-10 columns segment --transparent">
            <ul class="ul --inline --right">
                <li class="li --start">
                    <div class="header --small">
                        @lang('project.review-list')
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
            @each('committee.project.partials.fragments.review', $reviews, 'review')
        </div>

        <div class="small-10 columns segment --transparent">
            <ark-pagination :data="{{ $reviews->toJson() }}"></ark-pagination>
        </div>

    </div>
@endsection
