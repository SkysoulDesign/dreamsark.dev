@extends('layouts.master-user')

@section('content')

    @if($model instanceof DreamsArk\Models\Project\Stages\Fund)
        @include('project.fund.vote.create')
    @endif

    @if($model instanceof DreamsArk\Models\Project\Stages\Idea    ||
        $model instanceof DreamsArk\Models\Project\Stages\Synapse ||
        $model instanceof DreamsArk\Models\Project\Stages\Script)
        @include('project.vote.create')
    @endif

@endsection

@section('styles')
    <link href="{{ asset('css/flipclock.css') }}" rel="stylesheet" media="all"/>
@endsection
@section('pos-scripts')
    <script src="{{ asset('js/flipclock.min.js') }}"></script>
    <script>
        $(document).ready(function () {
            /**
             * Countdown
             */
            if ($('#flipclock').length > 0)
                $('#flipclock').FlipClock($('#flipclock').attr('data-time'), {
                    countdown: true
                });
        });
    </script>
@endsection