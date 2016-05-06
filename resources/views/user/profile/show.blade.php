@extends('layouts.master-user')


@section('content')
    <div class="column">
        @if($isPublicProfile)
            <h2>{{ $profile->display_name }} @lang('user.profile')</h2>
        @else
            <h3>@lang('user.view-profile')</h3>
        <div class="ui right aligned menu">
            <a class="ui purple button" href="{{ route('user.profile.public', [$profile->name, auth()->user()->username]) }}">
                <i class="world icon" style="font-size: 1.5em;"></i>
                @lang('user.view-public-profile')
            </a>
        </div>

        @endif

    </div>
    <div class="ui tabular menu">
        @foreach($sections as $index => $section)
            <div class="{{ $index != 0 ?: "active" }} item" data-tab="tab-{{ $section->name }}">
                {{ $section->name }}
            </div>
        @endforeach
    </div>

    @foreach($group = $profile->questions->groupBy('pivot.section.name') as $section => $questions)

        <div class="ui bottom attached tab segment {{ $group->keys()[0] != $section ?:'active' }}"
             data-tab="tab-{{ $section }}">
            @foreach($questions as $question)
                <table class="ui celled table">
                    <tbody>
                    <tr>
                        <td width="30%">{{ $question->question }}</td>
                        <td width="70%">
                            @php
                                $content = isset($answers[$question->id])?$answers[$question->id]['content'] : '';
                            @endphp
                            @if($content)
                                @if(in_array($question->type->name, ['image', 'video']))
                                    <div class="ui modal question-{{ $question->id }}">
                                        <div class="header">{{ $question->question }}</div>
                                        @if($question->type->name=='video')
                                            <div class="image content">
                                                <video class="video"
                                                       src="/{{ Config::get('defaults.profile.video').$content }}"
                                                       width="100%" controls></video>
                                            </div>
                                        @elseif($question->type->name=='image')
                                            <div class="image content">
                                                <img class="image"
                                                     src="/{{ Config::get('defaults.profile.image').$content }}">
                                            </div>
                                        @endif
                                    </div>
                                    <div class="ui button modalLink" target="question-{{ $question->id }}">
                                        <i class="{!! $question->type->name=='image'?'photo':'film' !!} icon"></i>
                                        View
                                    </div>
                                @elseif($question->type->name=='file')
                                    <a class="ui button" target="_blank"
                                       href="/{{ Config::get('defaults.profile.file').$content }}">
                                        <i class="file icon"></i>View File</a>
                                @elseif($question->type->name=='color')
                                    <input type="color" value="{{ $content }}" disabled/>
                                @elseif(in_array($question->type->name, ['checkbox', 'radio', 'select']))
                                    @php
                                        if($question->type->name == 'checkbox')
                                            $value = json_decode($content);
                                        else
                                            $value = [$content];
                                        $options =  $option->getDataByType($value, ['name']);
                                    @endphp
                                    <ul class="ui list">
                                        @foreach($options as $opt)
                                            <li class="item">{{ $opt->cleanName }}</li>
                                        @endforeach
                                    </ul>
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

@endsection
@section('pos-scripts')
    <script>
        $(document).ready(function () {
            $(document.body).on('click', '.ui.button.modalLink', function () {
                $('.ui.modal.' + $(this).attr('target'))
                        .modal('setting', 'transition', 'fade up').modal('show')
                ;
            });
        });
    </script>
@endsection