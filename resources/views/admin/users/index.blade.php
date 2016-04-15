@extends('layouts.master-admin')

@section('content')
    @include('admin.partials.user-menu')
    <table class="ui selectable celled table">
        <thead>
        <tr>
            <th>@lang('forms.username')</th>
            <th>@lang('forms.email')</th>
            <th>@lang('forms.action')</th>
        </tr>
        </thead>
        <tbody>
        @foreach($users as $user)
            <tr>
                <td>{{ $user->username }}</td>
                <td>{{ $user->email }}</td>

                <td class="">
                    <div class="ui small basic icon buttons">
                        <a class="ui button" href="{{ route('admin.user.edit', $user->id) }}">
                            <i class="edit icon"></i>
                            @lang('forms.edit')
                        </a>
                        <a class="ui button delete-item" href="{{ route('admin.user.destroy', $user->id) }}">
                            <i class="delete icon"></i>
                            @lang('forms.delete')
                        </a>
                    </div>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection