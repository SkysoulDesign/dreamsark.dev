@extends('layouts.master-admin')

@section('content')
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
                        <a class="ui button" href="javascript:;">
                            <i class="edit icon"></i>
                            @lang('forms.edit')
                        </a>
                    </div>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endsection