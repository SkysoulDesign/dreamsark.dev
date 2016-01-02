@extends('layouts.master')

@section('content')

    <div class="column">

        <div class="ui segment">
            @include('forms.synapse-creation', $project)
        </div>

    </div>

@endsection