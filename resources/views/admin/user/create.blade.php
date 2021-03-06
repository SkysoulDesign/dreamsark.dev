@extends('layouts.master')

@section('content')

    @include('admin.partials.header')

    <div class="row">
        <div class="small-12">

            @include('admin.partials.user-menu')

            <div class="ui segment">
                <form class="ui form warning error" action="{{ route('admin.user.store') }}" method="POST">

                    {{ csrf_field() }}
                    <h3>@lang('user.create-user')</h3>

                    <div class="required field">
                        <label>@lang('forms.user-role')</label>
                        <div class="ui fluid search selection dropdown">
                            <input type="hidden" name="role_id" value="{{ old('role_id', 'user') }}">
                            <i class="dropdown icon"></i>
                            <div class="default text">@lang('forms.select-user-role')</div>
                            <div class="menu">
                                @foreach($roles as $role)
                                    <div class="item" data-value="{{ $role->name }}">
                                        {{ studly_case($role->name) }}
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>

                    @include('partials.field', ['name' => 'username', 'value' => old('username')])

                    @include('partials.field', ['type'=>'password', 'name' => 'password', 'value' => old('password')])

                    @include('partials.field', ['type'=>'password', 'name' => 'password_confirmation', 'value' => old('password_confirmation')])

                    @include('partials.field', ['name' => 'email', 'value' => old('email')])

                    @include('partials.field', ['name' => 'name', 'value' => old('name')])

                    <button class="ui submit button primary" type="submit">@lang('forms.create')</button>

                    <a href="{{ route('admin.user.index') }}" class="ui button ui-icon-cancel">
                        @lang('forms.cancel')
                    </a>

                </form>
            </div>
        </div>
    </div>
@endsection
