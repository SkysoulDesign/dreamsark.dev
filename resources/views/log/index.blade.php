@extends('layouts.master', ['class' => 'home-page'])

@section('content')

    @include('partials.navigation.menu', ['translucent' => true])

    <div class="row +margin-top">
        <div class="small-12 columns segment --large-padding">

            <div class="header --small">
                # August 19
                <div class="divider"></div>
            </div>

            <ul>
                <li>Fixed Reward coins distribution on the stages [Idea -> Synapse -> Script]</li>
                <li>Added Chinese Language to Calendar Picker</li>
            </ul>

        </div>
    </div>

@endsection
