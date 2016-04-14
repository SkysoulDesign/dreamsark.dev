@extends('layouts.master-admin')

@section('content')
    @include('admin.partials.profile-menu')

    <div class="ui segment">
        <form class="ui form" action="{{ route('admin.profile.update', $profile->id) }}" method="POST">

            {{ method_field('patch') }}

            {{ csrf_field() }}
            <h3>@lang('forms.edit-profile')</h3>
            <div class="required field">
                <label>@lang('forms.name')</label>
                <input type="text" readonly name="name" placeholder="@lang('forms.profile-name-lower')" value="{{ old('name', $profile->name) }}">
            </div>
            <div class="required field">
                <label>@lang('forms.display-name')</label>
                <input type="text" name="display_name" placeholder="@lang('forms.profile-name')" value="{{ old('display_name', $profile->display_name) }}">
            </div>

            <button class="ui submit button primary" type="submit">@lang('forms.update')</button>

            <a href="{{ route('admin.profile.index') }}" class="ui button ui-icon-cancel">
                @lang('forms.cancel')
            </a>

        </form>
    </div>
@endsection