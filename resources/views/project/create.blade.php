@extends('layouts.master')

@section('content')

    <div class="column">

        <div class="ui segment">
            @include('forms.project-start', $user)
        </div>

    </div>

@endsection