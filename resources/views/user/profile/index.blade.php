@extends('layouts.master-user')


@section('content')
    <div class="column">

        <div class="ui right aligned segment">
            <a href="{{ route('user.profiles.create') }}" class="ui primary button">
                @lang('profile.create-profile')
            </a>
        </div>
        @if(!empty($profiles->toArray()))
            <div class="ui grid four column">
                <div class="column">Type</div>
                <div class="column">Nickname</div>
                <div class="column">Views</div>
                <div class="column">Actions</div>

                <div class="column">Actor</div>
                <div class="column">asads</div>
                <div class="column">213</div>
                <div class="column">View Profile Edit</div>
            </div>
        @else
            <h3>@lang('profile.no-profile-available')</h3>
        @endif
    </div>
@endsection