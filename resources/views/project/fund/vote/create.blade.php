@extends('layouts.master')

@section('content')

    <div class="column">

        @foreach($model->enrollable->groupBy('expenditurable_type') as $class => $type)
            <div class="ui segment">
                <div class="ui header"> {{ class_basename($class) }} </div>
                <div class="ui styled fluid accordion">
                    @foreach($type as $expenditure)

                        <div class="title">
                            <i class="dropdown icon"></i>
                            {{ $expenditure->expenditurable->name or $expenditure->expenditurable->present()->position }}
                            @if($expenditure->expenditurable->name)
                                - {{ $expenditure->expenditurable->present()->position }}
                            @endif
                        </div>
                        <div class="content">
                            <table class="ui compact celled table">
                                <thead>
                                <tr>
                                    <th>@lang('project.candidates')</th>
                                    <th>@lang('project.votes')</th>
                                    <th>@lang('project.vote')</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($expenditure->enrollers as $enroller)

                                    <tr>
                                        <td>
                                            <img src="{{ $enroller->user->present()->avatar }}" class="ui avatar image">
                                            <span>{{ $enroller->user->present()->name }}</span>
                                        </td>
                                        <td>
                                            {{ $expenditure->votes->count() }}
                                        </td>
                                        <td class="collapsing">
                                            <form class="ui form" method="post"
                                                  action="{{ route('project.fund.vote.store', $enroller->id) }}">
                                                {{ csrf_field() }}
                                                <button class="olive circular ui icon button">
                                                    <i class="icon thumbs up"></i>
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>
                    @endforeach
                </div>
            </div>
        @endforeach

    </div>

@endsection