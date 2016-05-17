@extends('layouts.master-user')

@section('content')
    <div class="left menu">
        <a class="item ui button" href="{{ route('project.show', $model->project->id) }}">
            <i class="arrow left icon"></i>
            @lang('navbar.back')
        </a>
    </div>

    <div class="column">
        <h2>{{ ($model->project->name) }}</h2>

        @foreach($model->enrollable->groupBy('expenditurable_type') as $class => $type)
            <div class="ui segment">
                <div class="ui header"> {{ class_basename($class) }} </div>
                <div class="ui styled fluid accordion">
                    @foreach($type as $index => $expenditure)

                        <div class="{{ ($index>0?'':'active ') }}title">
                            <i class="dropdown icon"></i>
                            {{ $expenditure->expenditurable->name or $expenditure->expenditurable->profile->display_name }}
                            @if($expenditure->expenditurable->name)
                                - {{ $expenditure->expenditurable->profile->display_name }}
                            @endif
                        </div>
                        <div class="{{ ($index>0?'':'active ') }}content">
                            <table class="ui compact celled table">
                                <thead>
                                <tr>
                                    <th>@lang('project.candidates')</th>
                                    <th>@lang('project.expected-cost')</th>
                                    <th>@lang('project.votes')</th>
                                    <th>@lang('project.vote')</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($expenditure->enrollers as $enroller)

                                    <tr>
                                        <td>
                                            <a href="javascript:;" class="ui view-modal view-profile"
                                               data-url="{{ route('public.profile.show.iframe', [$expenditure->expenditurable->profile->name, $enroller->user->username]) }}">
                                                <img src="{{ $enroller->user->present()->avatar }}"
                                                     class="ui avatar image">
                                                <span>{{ $enroller->user->present()->name }}</span>
                                            </a>
                                        </td>
                                        <td>
                                            {{ $expenditure->expenditurable->cost }}
                                        </td>
                                        <td>
{{--                                            {{ $enroller->enrollvotes->count() }}--}}
                                            {{ $enroller->enrollvotes->pluck('amount')->sum() }}
                                        </td>
                                        <td class="collapsing">
                                            <form class="ui form" method="post"
                                                  action="{{ route('project.fund.vote.store', $enroller->id) }}">
                                                {{ csrf_field() }}
                                                <div class="inline fields">
                                                    @include('partials.field',['name' => 'amount', 'label' => trans('forms.amount'), 'displayLabel' => false])
                                                    <button class="olive circular ui icon button">
                                                        <i class="icon thumbs up"></i>
                                                    </button>
                                                </div>
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

    <div id="profile-view-modal" class="ui fullscreen modal">
        <i class="close icon"></i>
        <div class="ui embed" data-url="{{ route('public.profile.show.iframe', ['user', 'user']) }}"
             data-placeholder="{{ asset('dreamsark-assets/mini-header-bg.jpg') }}"
             data-icon="right circle arrow">
        </div>
    </div>

@endsection

@section('pos-scripts')
    <script>
        $(document).ready(function () {
            $('#profile-view-modal')
                    .modal({
                        blurring: true,
                    })
                    .modal('attach events', '.view-profile', 'show')
            ;

            var embedIdentifier = '#profile-view-modal .ui.embed'
            var iconElem        = ($(embedIdentifier).attr('data-icon')).replace(/ /g, '.')
            $('.view-profile').on('click', function () {
                $(embedIdentifier).embed({
                    url:     $(this).attr('data-url'),
                    onEmbed: function () {
                        $("#profile-view-modal").modal("refresh");
                    }
                });
                setTimeout(function () {
                    $(embedIdentifier + ' .' + iconElem).trigger('click');
                }, 250);
                $(this).trigger('blur');
            });
        });
    </script>
@endsection