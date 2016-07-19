@extends('layouts.master')

@section('content')

    @include('user.partials.header')

    <div class="row">

        <div class="small-12 columns">
            @if(isset($isIFrameCall) && $isIFrameCall)
            @else
                <div class="left menu">
                    <a class="item ui button" href="{{ route('public.profile.list', [$userProfile->name]) }}">
                        <i class="arrow left icon"></i>
                        @lang('navbar.back-to-list')
                    </a>
                </div>
            @endif
            <div class="ui internally celled grid">
                <div class="row">
                    <div class="three wide column">
                        <div class="ui small images">
                            <img src="{{ asset('img/avatar/holder.png') }}">
                        </div>
                        <ul class="ui list">
                            <li>@lang('profile.created-date')
                                :&nbsp;{{ $userProfile->answer->created_at->format('m/d/Y H:i A') }}</li>
                            <li>@lang('user.member-since'):&nbsp;{{ $user->created_at->format('M Y') }}</li>
                        </ul>
                    </div>
                    <div class="thirteen wide column">
                        <h2>{{ ucwords($user->name?: $user->username) .' - '. $userProfile->display_name }} @lang('user.profile')</h2>
                        <div class="ui tabular menu">
                            @foreach($sections as $index => $section)
                                <div class="{{ $index != 0 ?: "active" }} item" data-tab="tab-{{ $section->name }}">
                                    {{ $section->name }}
                                </div>
                            @endforeach
                        </div>

                        @foreach($group = $userProfile->questions->groupBy('pivot.section.name') as $section => $questions)

                            <div class="ui profile-tab bottom attached tab segment {{ $group->keys()[0] != $section ?:'active' }}"
                                 data-tab="tab-{{ $section }}" style="min-height: 350px;">
                                @foreach($questions as $question)
                                    <table class="ui celled table">
                                        <tbody>
                                        <tr>
                                            <td width="30%">{{ $question->question }}</td>
                                            <td width="70%">
                                                @php
                                                    $type = $question->type->name;
                                                    $answer = isset($answers[$question->id])?$answers[$question->id]:[];
                                                    $content = '';
                                                    if($answer && $answer[0]){
                                                        if(sizeof($answer)>1 || in_array($type, ['select', 'radio']))
                                                            $content = $answer->pluck('option_id')->toArray();
                                                        else
                                                            $content = $answer[0]->content;
                                                    }
                                                @endphp
                                                @if($content)
                                                    @if(in_array($type, ['image', 'video']))
                                                        <div class="ui modal question-{{ $question->id }}">
                                                            <div class="header">{{ $question->question }}</div>
                                                            @if($type=='video')
                                                                <div class="image content">
                                                                    <video class="video"
                                                                           src="/{{ $content }}"
                                                                           width="100%" controls></video>
                                                                </div>
                                                            @elseif($type=='image')
                                                                <div class="image content">
                                                                    <img class="image"
                                                                         src="/{{ $content }}">
                                                                </div>
                                                            @endif
                                                        </div>
                                                        <div class="ui button modalLink"
                                                             target="question-{{ $question->id }}">
                                                            <i class="{!! $type=='image'?'photo':'film' !!} icon"></i>
                                                            View
                                                        </div>
                                                    @elseif($type=='file')
                                                        <a class="ui button" target="_blank"
                                                           href="/{{ $content }}">
                                                            <i class="file icon"></i>View File</a>
                                                    @elseif(in_array($type, ['color', 'time', 'week']))
                                                        <input type="{{ $type }}" value="{{ $content }}" disabled/>
                                                    @elseif(in_array($type, ['checkbox', 'radio', 'select']))
                                                        @php
                                                            $options =  $option->getDataByType($content, ['name']);
                                                        @endphp
                                                        <ul class="ui list">
                                                            @foreach($options as $opt)
                                                                <li class="item">{{ $opt->cleanName }}</li>
                                                            @endforeach
                                                        </ul>
                                                    @elseif($type=='datetime-local')
                                                        {{ date('m/d/Y h:i A', strtotime($content)) }}
                                                    @elseif($type=='date')
                                                        {{ date('m/d/Y', strtotime($content)) }}
                                                    @else
                                                        {{ $content }}
                                                    @endif
                                                @else
                                                    -
                                                @endif

                                            </td>
                                        </tr>
                                        @endforeach
                                        </tbody>
                                    </table>
                            </div>
                        @endforeach
                    </div>

                </div>
            </div>
        </div>
    </div>

@endsection
@push('scripts')
<script>
    $(document).ready(function () {
        $(document.body).on('click', '.ui.button.modalLink', function () {
            $('.ui.modal.' + $(this).attr('target'))
                    .modal('setting', 'transition', 'fade up').modal('show')
            ;
        });
    });
</script>
@endpush
