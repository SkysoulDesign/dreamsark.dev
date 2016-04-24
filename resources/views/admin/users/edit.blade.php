@extends('layouts.master-admin')

@section('content')
    @include('admin.partials.user-menu')

    <div class="ui segment">
        <form class="ui form warning error" action="{{ route('admin.user.update', $user->id) }}" method="POST">
            {{ method_field('patch') }}

            {{ csrf_field() }}
            <h3>@lang('forms.create-user')</h3>

            <div class="required field">
                <label>Role</label>
                <div class="ui fluid search selection dropdown">
                    <input type="hidden" name="role_id" value="{{ old('role_id', 'user') }}">
                    <i class="dropdown icon"></i>
                    <div class="default text">Select User Role</div>
                    <div class="menu">
                        @foreach($roles as $role)
                            <div class="item" data-value="{{ $role->name }}">
                                {{ studly_case($role->name) }}
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>

            @include('partials.field', ['name' => 'username', 'value' => old('username', $user->username)])

            @include('partials.field', ['type'=>'password', 'placeholder'=>'Leave blank if don\'t want to change password', 'name' => 'password', 'value' => old('password')])

            @include('partials.field', ['type'=>'password', 'name' => 'password_confirmation', 'value' => old('password_confirmation')])

            @include('partials.field', ['name' => 'email', 'value' => old('email', $user->email)])

            @include('partials.field', ['name' => 'name', 'value' => old('name', $user->name)])

            <button class="ui submit button primary" type="submit">Update</button>

            <a href="{{ route('admin.user.index') }}" class="ui button ui-icon-cancel">
                @lang('forms.cancel')
            </a>

        </form>
    </div>
@endsection