@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

    @include('admin.partials.header')
    @include('admin.profile.partials.nav')

    <div class="row --fluid align-center +margin-top">

        @include('admin.profile.partials.actions', ['title' =>  trans('project.profile-list')])

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
                                    <ark-dropdown-option href="{{ route('admin.profile.edit', $profile->name) }}"
                                                         icon="edit">Edit
                                    </ark-dropdown-option>
                                    <ark-dropdown-option href="{{ route('admin.profile.destroy', $profile->name) }}"
                                                         icon="times">delete
                                    </ark-dropdown-option>
                                </ark-dropdown>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

    </div>

@endsection
