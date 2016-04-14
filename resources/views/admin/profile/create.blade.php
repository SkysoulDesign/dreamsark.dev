@extends('layouts.master-admin')

@section('content')
    @include('admin.partials.profile-menu')

    <div class="ui segment">
        <form class="ui form" action="{{ route('admin.profile.store') }}" method="POST">

            {{ csrf_field() }}
            <h3>@lang('forms.create-profile')</h3>
            <div class="required field">
                <label>@lang('forms.name')</label>
                <input type="text" name="name" placeholder="@lang('forms.profile-name-lower')" value="{{ old('name') }}">
            </div>
            <div class="required field">
                <label>@lang('forms.display-name')</label>
                <input type="text" name="display_name" placeholder="@lang('forms.profile-name')" value="{{ old('display_name') }}">
            </div>

            @include('admin.profile.form-question')

            <button class="ui submit button primary" type="submit">@lang('forms.create')</button>

            <a href="{{ route('admin.profile.index') }}" class="ui button ui-icon-cancel">
                @lang('forms.cancel')
            </a>

        </form>
    </div>
@endsection