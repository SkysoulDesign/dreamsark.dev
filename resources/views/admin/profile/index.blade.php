@extends('layouts.master-admin')

@section('content')
    @include('admin.partials.profile-menu')
    <table class="ui selectable celled table">
        <thead>
        <tr>
            <th>@lang('forms.name')</th>
            <th>@lang('forms.display-name')</th>
            <th>@lang('forms.action')</th>
        </tr>
        </thead>
        <tbody>
        @foreach($profiles as $profile)
            <tr>
                <td>{{ $profile->name }}</td>
                <td>{{ $profile->display_name }}</td>

                <td class="">
                    <div class="ui small basic icon buttons">
                        <a class="ui button" href="{{ route('admin.profile.edit', $profile->id) }}">
                            <i class="edit icon"></i>
                            @lang('forms.edit')
                        </a>
                        <a class="ui button delete-item" href="{{ route('admin.profile.destroy', $profile->id) }}">
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