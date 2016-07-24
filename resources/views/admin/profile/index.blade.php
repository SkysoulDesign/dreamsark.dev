@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

    @include('admin.partials.header')
    @include('admin.profile.partials.nav');

    <div class="row --fluid align-center +margin-top">

        <div class="small-10 segment columns --transparent">
            <ul class="ul --inline --right">
                <li class="li --start">
                    <header class="header --small">
                        @lang('project.profile-list')
                    </header>
                </li>
                <li>
                    <a href="#hi">
                        <ark-button icon="plus" color="primary">
                            Create Profile
                        </ark-button>
                    </a>
                </li>
                <li>
                    <ark-dropdown title="Sort by" icon="sort-amount-desc">
                        <ark-dropdown-option>@lang('forms.name')</ark-dropdown-option>
                        <ark-dropdown-option>@lang('forms.a-to-z')</ark-dropdown-option>
                    </ark-dropdown>
                </li>
            </ul>
        </div>

        <div class="small-10 columns">
            <div class="row">
                @foreach($profiles as $profile)
                    <div class="small-4 columns">
                        <div class="item --hover">

                            <div class="small-3 columns item__image +profile-color-{{$profile->name}}">
                                <img src="{{ asset("img/profile/$profile->name.png") }}" alt="">
                            </div>

                            <div class="small-7 columns">

                                <ul class="--tight">
                                    <li>
                                        <h4>
                                            <a href="#">
                                                @lang("positions.$profile->name")
                                            </a>
                                        </h4>
                                    </li>
                                    <li class="li --sub-tittle">
                                        Number of questions: <b>{{ $profile->questions->count() }}</b>
                                    </li>
                                </ul>

                            </div>

                            <div class="small-2 columns +center">
                                <ark-dropdown icon="cog" mode="icon" pop="center">
                                    <ark-dropdown-option icon="eye">View</ark-dropdown-option>
                                    <ark-dropdown-option icon="plus">Add Question</ark-dropdown-option>
                                    <ark-dropdown-option icon="pencil">Edit</ark-dropdown-option>
                                    <ark-dropdown-option icon="times">delete</ark-dropdown-option>
                                </ark-dropdown>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>

    <div class="row">

        <div class="small-12 columns">

            @include('admin.partials.profile-menu')
            <table class="ui selectable celled table">
                <thead>
                <tr>
                    <th>@lang('forms.name')</th>
                    <th>@lang('forms.display-name')</th>
                    <th>@lang('forms.action')</th>
                </tr>
                </thead>
                <tbody>
                @foreach($profiles as $profile)
                    <tr>
                        <td>{{ $profile->name }}</td>
                        <td>{{ $profile->display_name }}</td>

                        <td class="">
                            <div class="ui small basic icon buttons">
                                <a class="ui button" href="{{ route('admin.profile.edit', $profile->name) }}">
                                    <i class="edit icon"></i>
                                    @lang('forms.edit')
                                </a>
                                <a class="ui button delete-item"
                                   href="{{ route('admin.profile.destroy', $profile->name) }}">
                                    <i class="delete icon"></i>
                                    @lang('forms.delete')
                                </a>
                            </div>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>

@endsection
