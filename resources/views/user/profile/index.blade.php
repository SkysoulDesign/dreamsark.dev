@extends('layouts.master-user')


@section('content')
    <div class="column">

        {{--<div class="ui right aligned segment">--}}
        {{--<a href="{{ route('user.profiles.create') }}" class="ui primary button">--}}
        {{--@lang('profile.create-profile')--}}
        {{--</a>--}}
        {{--</div>--}}
        <section>
            @if(!empty($profiles->toArray()))
                <div class="ui grid three column">
                    <div class="column">Type</div>
                    <div class="column">Status</div>
                    <div class="column">Actions</div>
                    @php
                        $userProfileArr = $user_profiles->pluck('id')->toArray();
                    @endphp

                    @foreach($profiles as $profile)
                        <div class="column">
                            {{ $profile->display_name }}
                            <i class="icon profile-{{ $profile->name }}"></i>
                        </div>
                        @if(in_array($profile->id, $userProfileArr))

                            <div class="column">
                                <div class="ui indicating progress success" data-percent="{{ ($user_profiles->find($profile->id)->answerCount * 100 / $profile->questionCount) }}">
                                    <div class="bar">
                                        <div class="progress"></div>
                                    </div>
                                    <div class="label">@lang('profile.completed-status')</div>
                                </div>
                            </div>
                            <div class="column">
                                <a href="{{ route('user.profile.show', $profile->name) }}" class="ui green button">
                                    <i class="icon view"></i>
                                    @lang('forms.view')
                                </a>
                                <a href="{{ route('user.profile.edit', $profile->name) }}" class="ui button">
                                    <i class="icon edit"></i>
                                    @lang('forms.edit')
                                </a>
                            </div>
                        @else
                            <div class="column">
                                <div class="ui indicating disabled progress warning" data-percent="0">
                                    <div class="bar"></div>
                                </div>
                            </div>
                            <div class="column">
                                <a href="{{ route('user.profile.create', $profile->name) }}" class="ui primary button">
                                    <i class="icon add"></i>
                                    @lang('profile.create-profile')
                                </a>
                            </div>
                        @endif
                    @endforeach

                </div>
            @else
                <h3>@lang('profile.no-profile-available')</h3>
            @endif
        </section>
    </div>
@endsection