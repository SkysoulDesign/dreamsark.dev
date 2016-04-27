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
                        <div class="ui primary button" target="question-{{ $question->id }}">
                            <i class="play icon"></i>
                            View
                        </div>
                    @elseif($question->type->name=='file')
                        <a class="ui primary button" target="_blank" href="/{{ Config::get('defaults.profile.file').$content }}">
                            <i class="external icon"></i>View File</a>
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
            $(document.body).on('click', '.ui.primary.button', function () {
                $('.ui.modal.' + $(this).attr('target'))
                        .modal('setting', 'transition', 'fade up').modal('show')
                ;
            });
        });
    </script>
@endsection