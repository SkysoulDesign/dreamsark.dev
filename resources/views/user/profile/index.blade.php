@extends('layouts.master-user')

@section('content')

    <div class="column">
        <section>

            @if(!$profiles->isEmpty())

                <div class="ui grid three column">

                    <div class="column">Type</div>
                    <div class="column">Status</div>
                    <div class="column">Actions</div>

                    @foreach($profiles as $profile)

                        <div class="column">
                            {{ $profile->display_name }}
                            <i class="icon profile-{{ $profile->name }}"></i>
                        </div>

                        @if($user->hasProfile($profile))

                            <div class="column">
                                <div class="ui indicating progress success"
                                     data-percent="{{ $user->present()->profileCompletion($profile) }}">
                                    <div class="bar">
                                        <div class="progress"></div>
                                    </div>
                                    <div class="label">Completion</div>
                                </div>
                            </div>

                            <div class="column">
                                <a href="{{ route('user.profile.show', $profile->name) }}" class="ui green button">
                                    <i class="icon unhide"></i>
                                    View
                                </a>
                                <a href="{{ route('user.profile.edit', $profile->name) }}" class="ui button">
                                    <i class="icon edit"></i>
                                    Edit
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
                                    Create Profile
                                </a>
                            </div>

                        @endif
                    @endforeach

                </div>
            @else
                <h3>No Profiles Available</h3>
            @endif

        </section>
    </div>
@endsection