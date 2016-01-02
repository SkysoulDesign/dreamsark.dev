@extends('layouts.master')

@section('content')

    <div class="column">

        <div class="ui segment">
            @include('forms.project-edition', $project)
        </div>

    </div>

@endsection