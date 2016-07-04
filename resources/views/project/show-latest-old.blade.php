@extends('layouts.master-user')

@section('content')
    @php
    $stageArr = ['review', 'fund', 'distribution'];
    $projectStage = strtolower(class_basename($project->stage));
    @endphp
    <div class="column">


        @if(!in_array($projectStage, $stageArr))
            @if(!$project->stage->active)
                <div class="ui inverted red segment">
                    @lang('project.project-failed')
                </div>
            @endif
            @if($project->stage->vote->active)
                <div class="ui inverted olive segment">
                    <a class="ui header" href="{{ route('vote.show', $project->stage->vote->id) }}">
                        @lang('vote.is-open')
                    </a>
                </div>
            @endif
        @endif

        @include('project.' . strtolower(class_basename($project->stage)) . '.show')

        @if(isset($isIFrameCall) && $isIFrameCall)
        @else
            @include('partials.comments')
        @endif

    </div>

@endsection

@section('styles')
    <link href="{{ asset('css/flipclock.css') }}" rel="stylesheet" media="all"/>
@endsection
@section('pos-scripts')
    <script src="{{ asset('js/flipclock.min.js') }}"></script>
    @if(in_array($projectStage, $stageArr))
        @include('forms.project-stage-script')
    @else
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
    @endif
@endsection