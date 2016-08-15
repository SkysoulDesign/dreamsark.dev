@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

    @include('project.partials.header', ['title' => $project->name])

    <div class="row align-center">

        <div class="small-10 columns segment --attached --centered --overlapped --large-padding project-page__fund">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consequatur eius ex laborum laudantium ullam.
            Blanditiis consequatur consequuntur eligendi et impedit libero quam reiciendis sapiente tempora voluptatem.
            Deserunt, natus, repudiandae.
        </div>

        <div class="small-10 columns segment --color-purple --centered --attached --large-padding +no-round-bottom">

            <div class="row align-center">
                <div class="small-12 columns +margin-bottom">
                    <div class="header">@lang('project.invest-select-profile')</div>
                    <p>@lang('project.invest-profile-available')</p>
                </div>
                @foreach($expenditures as $expenditure)
                    <div class="small-2 columns">

                        @if($expenditure->expenditurable->profile)
                            @set($name, $expenditure->expenditurable->profile->name)
                            <div class="+profile-color-{{ $name }}">
                                <img class="+circle" src="{{ asset("img/profile/{$name}") }}.png">
                                <h4 class="+color-white +bold">@lang("positions.$name")</h4>
                            </div>
                        @endif

                    </div>
                @endforeach
            </div>

        </div>

        <div class="small-10">
            <table class="table --attached-top --color-purple">
                <thead>
                <tr>
                    <th>@lang('forms.name')</th>
                    <th>@lang('project.invest-expect-salary')</th>
                    <th>@lang('project.invest-enrolled-candidator-count')</th>
                    <th>@lang('project.invest-enrolled-description')</th>
                    <th>@lang('forms.action')</th>
                </tr>
                </thead>
                <tbody>

                @foreach($expenditures as $expenditure)
                    <tr>
                        <td>
                            <div class="row align-middle">

                                @if($expenditure->expenditurable->profile)
                                    @set($name, $expenditure->expenditurable->profile->name)
                                    <div class="+profile-color-{{ $name }}" style="margin:0 1em">
                                        <img class="+circle" width="50" src="{{ asset("img/profile/{$name}") }}.png">
                                    </div>
                                @endif

                                <div class="header --medium">
                                    {{ $expenditure->expenditurable->name }}
                                    <p>@lang("positions.{$expenditure->expenditurable->profile->name}")</p>
                                </div>

                            </div>
                        </td>

                        <td>
                            <B>{{ $expenditure->expenditurable->dispenses->sum('amount') }}</B>
                        </td>

                        <td>
                            {{ $expenditure->enrollers->count() }}
                        </td>

                        <td>
                            {{ $expenditure->expenditurable->description }}
                        </td>

                        <td class="+align-right">

                            @if(auth()->user()->hasProfile($expenditure->expenditurable->profile))

                                @if(!$expenditure->enrollers->contains('user_id', auth()->user()->id))
                                    <ark-form action="{{ route('project.enroll.store', $expenditure) }}">
                                        <ark-button color="success" icon="plus">@lang('project.enroll')</ark-button>
                                    </ark-form>
                                @else
                                    <ark-form action="{{ route('project.unroll.store', $expenditure) }}">
                                        <ark-button color="danger" icon="times">@lang('project.unroll')</ark-button>
                                    </ark-form>
                                @endif

                            @else

                                <ark-button href="{{ route('user.profile.create', ['profile'=>$name]) }}"
                                            icon="plus"
                                            color="warning">
                                    @lang('user.create-profile-to-enroll')
                                </ark-button>

                            @endif

                        </td>

                    </tr>
                @endforeach

                </tbody>
            </table>
        </div>

    </div>

@endsection
