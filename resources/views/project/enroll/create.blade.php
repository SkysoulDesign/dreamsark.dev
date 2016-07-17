@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

    @include('user.partials.header')

    <div class="row +margin-top +margin-bottom">
        <div class="small-12">

            <div class="column">

                <div class="ui segment">
                    <h2>{{ $expenditures[0]->project->name }}</h2>
                    <h3>@lang('project.crew')</h3>
                    <table class="ui celled table">
                        <thead>
                        <tr>
                            <th>@lang('forms.name')</th>
                            <th>@lang('forms.expected-salary')</th>
                            <th>@lang('forms.description')</th>
                            <th>@lang('forms.candidates-number')</th>
                            <th>@lang('project.enroll')</th>
                        </tr>
                        </thead>
                        <tbody>

                        @foreach($expenditures as $expenditure)
                            @php
                                $profile = $expenditure->expenditurable->profile;
                            @endphp

                            <tr>
                                <td>
                                    <h4 class="ui image header">
                                        <img src="{{ asset('img/avatar/male.png') }}" class="ui mini rounded image">

                                        <div class="content">
                                            {{ $expenditure->expenditurable->name }}
                                            <div class="sub header">
                                                {{ $profile->display_name or '' }}
                                            </div>
                                        </div>
                                    </h4>
                                </td>

                                <td>
                                    {{ $expenditure->expenditurable->cost }}
                                </td>

                                <td>
                                    {{ $expenditure->expenditurable->description }}
                                </td>

                                <td>
                                    {{ $expenditure->enrollers->count() }}
                                </td>

                                <td class="collapsing">
                                    @if($expenditure->users->contains('id', auth()->user()->id))
                                        @if($expenditure->project->stage instanceof \DreamsArk\Models\Project\Stages\Distribution)
                                        @elseif($expenditure->project->stage instanceof \DreamsArk\Models\Project\Stages\Fund && $expenditure->project->stage->vote->active)
                                        @else
                                            <form method="post"
                                                  action="{{ route('project.unroll.store', $expenditure->id) }}">
                                                {{ csrf_field() }}
                                                <button type="submit"
                                                        class="red ui icon button">@lang('project.unroll')</button>
                                            </form>
                                        @endif
                                    @else
                                        @if(auth()->user()->hasProfile($expenditure->expenditurable->profile))
                                            <form method="post"
                                                  action="{{ route('project.enroll.store', $expenditure->id) }}">
                                                {{ csrf_field() }}
                                                <button type="submit"
                                                        class="olive ui icon button">@lang('project.enroll')</button>
                                            </form>
                                        @else
                                            <a class="ui button"
                                               href="{{ route('user.profile.create', $profile->name) }}">@lang('user.create-profile-to-enroll')</a>
                                        @endif
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                        <tfoot>
                        <tr>
                            <th colspan="5">
                                <a class="ui grey button"
                                   href="{{ route('project.show', $expenditures[0]->project_id) }}">
                                    <i class="reply icon"></i>
                                    @lang('project.back-to-view')
                                </a>
                            </th>
                        </tr>
                        </tfoot>

                    </table>
                </div>

            </div>
        </div>
    </div>

@endsection
