@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row">

        <div class="small-12 columns">
            <div class="column">

                <div class="ui segment">
                    @include('forms.script-creation', $project)
                </div>

            </div>
        </div>
    </div>

@endsection
