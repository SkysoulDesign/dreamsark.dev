@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

    @include('committee.partials.header')

    <div class="row align-center +margin-top">
        <div class="small-12 segment --transparent">
            <ul class="ul --inline">
                <li>
                    <ark-button color="primary">Add Crew</ark-button>
                </li>
                <li>
                    <ark-button color="primary">Add Expense</ark-button>
                </li>
                <li class="li --end">
                    <ark-button color="success">Publish</ark-button>
                </li>
            </ul>
        </div>

        <table class="table">
            <thead>
            <tr>
                <th>@lang('forms.name')</th>
                <th>@lang('project.type')</th>
                <th>@lang('project.cost')</th>
                <th>@lang('project.description')</th>
                <th>@lang('forms.action')</th>
            </tr>
            </thead>
            <tbody>

            @foreach($review->project->expenditures as $expenditure)

                <tr>
                    <td>
                        <h4 class="ui image header">

                            <img src="{{ asset("img/profile/{$expenditure->expenditurable->profile->name}") }}.png"
                                 class="ui mini rounded image">

                            <div class="content">
                                {{ $expenditure->expenditurable->name }}
                                <div class="sub header">
                                    {{ (is_object($expenditure->expenditurable->profile) ? $expenditure->expenditurable->profile->display_name : '') }}
                                </div>
                            </div>
                        </h4>
                    </td>

                    <td>
                        {{ class_basename($expenditure->expenditurable) }}
                    </td>

                    <td>
                        {{ $expenditure->expenditurable->cost }}
                    </td>
                    <td>
                        {{ $expenditure->expenditurable->description }}
                    </td>

                    <td class="collapsing">
                        <form action="{{ route('committee.project.expenditure.destroy', $expenditure->id) }}"
                              method="post">
                            {{ csrf_field() }}
                            <button class="ui button red delete-item"><i
                                        class="delete icon"></i>@lang('project.remove')
                            </button>
                        </form>
                    </td>
                </tr>
            @endforeach
            </tbody>
            <tfoot class="full-width">
            <tr>
                <th></th>
                <th>
                    <div class="ui header">@lang('project.total')</div>
                </th>
                <th colspan="1">
                    @if($review->project->expenditures)
                        <div class="ui header">
                            {{ collect($review->project->expenditures)->pluck('expenditurable')->sum('cost') }}
                        </div>
                    @endif
                </th>
                <th></th>
                <th></th>
            </tr>
            </tfoot>
        </table>
    </div>

    <div class="row +margin-top +margin-bottom">
        <div class="small-12">
            <div class="column">

                <div class="ui segment">

                    {{--@include('modals.project-cast-modal')--}}
                    @include('modals.project-crew-modal')
                    @include('modals.project-expense-modal')

                    <div class="ui menu">
                        {{--<a id="project-add-cast" class="item"> @lang('project.add-cast') </a>--}}
                        <a id="project-add-crew" class="item"> @lang('project.add-crew') </a>
                        <a id="project-add-expense" class="item"> @lang('project.add-expense') </a>

                        <div class="right menu">
                            @include('admin.partials.project.view-project-button', ['project_id' => $review->project_id, 'class' => ' item'])
                            <div class="item">
                                <form method="post" action="{{ route('committee.project.publish', $review->id) }}"
                                      class="ui form">
                                    {{ csrf_field() }}
                                    <ark-input type="datetime-local" name="voting_date"
                                               label="open voting date"></ark-input>
                                    <button class="ui publish-review olive button">@lang('project.publish')</button>
                                </form>
                            </div>
                        </div>

                    </div>
                    @php $project = $review->project; @endphp
                    {{--<div class="ui three item menu">
                        <a id="project-idea-show" class="item @if(!$project->idea) disabled @endif">
                            <i class="icon mail"></i> @lang('project.idea')
                        </a>
                        <a id="project-synapse-show" class="item @if(!$project->synapse) disabled @endif">
                            <i class="icon users"></i> @lang('project.synapse')
                        </a>
                        <a id="project-script-show" class="item @if(!$project->script) disabled @endif">
                            <i class="icon users"></i> @lang('project.script')
                        </a>
                    </div>--}}

                    <table class="ui celled table">
                        <thead>
                        <tr>
                            <th>@lang('forms.name')</th>
                            <th>@lang('project.type')</th>
                            <th>@lang('project.cost')</th>
                            <th>@lang('project.description')</th>
                            <th>@lang('forms.action')</th>
                        </tr>
                        </thead>
                        <tbody>

                        @foreach($review->project->expenditures as $expenditure)

                            <tr>
                                <td>
                                    <h4 class="ui image header">
                                        <img src="{{ asset('img/avatar/male.png') }}" class="ui mini rounded image">

                                        <div class="content">
                                            {{ $expenditure->expenditurable->name }}
                                            <div class="sub header">
                                                {{ (is_object($expenditure->expenditurable->profile) ? $expenditure->expenditurable->profile->display_name : '') }}
                                            </div>
                                        </div>
                                    </h4>
                                </td>

                                <td>
                                    {{ class_basename($expenditure->expenditurable) }}
                                </td>

                                <td>
                                    {{ $expenditure->expenditurable->cost }}
                                </td>
                                <td>
                                    {{ $expenditure->expenditurable->description }}
                                </td>

                                <td class="collapsing">
                                    <form action="{{ route('committee.project.expenditure.destroy', $expenditure->id) }}"
                                          method="post">
                                        {{ csrf_field() }}
                                        <button class="ui button red delete-item"><i
                                                    class="delete icon"></i>@lang('project.remove')
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                        <tfoot class="full-width">
                        <tr>
                            <th></th>
                            <th>
                                <div class="ui header">@lang('project.total')</div>
                            </th>
                            <th colspan="1">
                                @if($review->project->expenditures)
                                    <div class="ui header">
                                        {{ collect($review->project->expenditures)->pluck('expenditurable')->sum('cost') }}
                                    </div>
                                @endif
                            </th>
                            <th></th>
                            <th></th>
                        </tr>
                        </tfoot>
                    </table>

                    {{--@if($project->idea) @include('modals.project-idea-show-modal') @endif
                    @if($project->synapse) @include('modals.project-synapse-show-modal') @endif
                    @if($project->script) @include('modals.project-script-show-modal') @endif--}}

                </div>

            </div>
        </div>
    </div>

@endsection

@push('scripts')
<script>
    $(document).ready(function () {
        if ($('#project-cast-modal').length > 0)
            $('#project-cast-modal')
                    .modal({
                        blurring: true,
                        closable: false,
                        onApprove: function () {
                            $('#project-cast-form').submit();
                        }
                    })
                    .modal('attach events', '#project-add-cast', 'show');

        if ($('#project-crew-modal').length > 0)
            $('#project-crew-modal')
                    .modal({
                        blurring: true,
                        closable: false,
                        onApprove: function () {
                            $('#project-crew-form').submit();
                        }
                    })
                    .modal('attach events', '#project-add-crew', 'show');

        if ($('#project-expense-modal').length > 0)
            $('#project-expense-modal')
                    .modal({
                        blurring: true,
                        closable: false,
                        onApprove: function () {
                            $('#project-expense-form').submit();
                        }
                    })
                    .modal('attach events', '#project-add-expense', 'show');

        $('.publish-review.button').on('click', function () {
            if (confirm("Are you sure to publish this project?"))
                return true;
            else
                return false;
        });
    });
</script>
@include('forms.project-stage-script')
@include('partials.embed-show-project-script')
@endpush
