@extends('layouts.master')

@section('content')

    <div class="column">

        <div class="ui segment">
            @include('forms.script-creation', $project)
        </div>

    </div>

@endsection