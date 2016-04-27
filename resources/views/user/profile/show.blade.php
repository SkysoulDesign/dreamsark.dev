@extends('layouts.master-user')


@section('content')
    <div class="column">
        <h3>@lang('user.view-profile')</h3>
        <h4>@lang('user.view-public-profile')</h4>
    </div>
    <div class="ui tabular menu">
        {{--*/ $active=true /*--}}
        @foreach($categories as $category)
            <div class="@if($active){!! 'active ' !!}{{--*/ $active=false /*--}} @endif{!! 'item' !!}"
                 data-tab="{{ $category }}">@lang('forms.'.$category)</div>
        @endforeach
    </div>
    @php
        $category=''; $active=true;
    @endphp
    @foreach($profile->questions as $question)
        @if($question->pivot->category!=$category)
            @if($category!='')
                {{--*/ $active=false /*--}}
                {!! '</tbody></table></div>' !!}
            @endif
            {{--*/ $category = $question->pivot->category /*--}}
            {!! '<div class="ui'.($active?' active':'').' tab segment" data-tab="'. $category .'" style="min-height: 350px;">' !!}
            {!! '<table class="ui celled table"><tbody>' !!}
        @endif
        <tr>
            <td>{{ $question->question }}</td>
            <td>
                @php
                    $content = isset($answers[$question->id])?$answers[$question->id]['content'] : '';
                @endphp
                @if($content)
                    @if(in_array($question->type->name, ['image', 'video']))
                        <div class="ui modal question-{{ $question->id }}">
                            <div class="header">{{ $question->question }}</div>
                            @if($question->type->name=='video')
                                <div class="image content">
                                    <video class="video" src="/{{ Config::get('defaults.profile.video').$content }}"
                                           width="100%" controls></video>
                                </div>
                            @elseif($question->type->name=='image')
                                <div class="image content">
                                    <img class="image" src="/{{ Config::get('defaults.profile.image').$content }}">
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
                        <input type="color" value="{{ $content }}" disabled />
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
    {!! '</tbody></table></div>' !!}

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