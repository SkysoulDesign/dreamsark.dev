@include('modals.project-cast-modal')
@include('modals.project-crew-modal')
@include('modals.project-expense-modal')

<div class="ui menu">
    <a id="project-add-cast" class="item"> @lang('project.add-cast') </a>
    <a id="project-add-crew" class="item"> @lang('project.add-crew') </a>
    <a id="project-add-expense" class="item"> @lang('project.add-expense') </a>

    <div class="right menu">
        <div class="item">
            <form method="post" action="{{ route('committee.project.publish', $review->id) }}" class="ui form">
                {{ csrf_field() }}
                <button class="ui olive button">@lang('project.publish')</button>
            </form>
        </div>
    </div>

</div>

<table class="ui celled table">
    <thead>
    <tr>
        <th>@lang('project.name')</th>
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
                        <div class="sub header">{{ $expenditure->expenditurable->position->name }}</div>
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
                <form action="{{ route('committee.project.expenditure.destroy', $expenditure->id) }}" method="post">
                    {{ csrf_field() }}
                    <button class="ui button red"><i class="ui icon x"></i>@lang('project.remove')</button>
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
