<h2>@lang('project.plan-data')</h2>
<table class="ui celled table">
    <thead>
    <tr>
        <th>@lang('forms.name')</th>
        <th>@lang('project.description')</th>
        <th>@lang('project.cost')</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td colspan="3">
            <div class="ui violet ribbon label">@lang('project.crew')</div>
        </td>
    </tr>
    @include('committee.project.fund.partials.expenditure-list', ['expenditures' => $enrollable])
    @php $crewTotal = collect($enrollable)->pluck('expenditurable')->sum('cost'); @endphp
    <tr>
        <td colspan="2">
            <div class="ui header right aligned">@lang('project.sub-total')</div>
        </td>
        <td>
            <div class="ui header">
                {{ $crewTotal }}
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="3">
            <div class="ui purple ribbon label">@lang('project.expense')</div>
        </td>
    </tr>
    @include('committee.project.fund.partials.expenditure-list', ['expenditures' => $expensable])
    @php $expenseTotal = collect($expensable)->pluck('expenditurable')->sum('cost'); @endphp
    <tr>
        <td colspan="2">
            <div class="ui header right aligned">@lang('project.sub-total')</div>
        </td>
        <td>
            <div class="ui header">
                {{ $expenseTotal }}
            </div>
        </td>
    </tr>
    </tbody>
    <tfoot class="full-width">
    <tr>
        <th colspan="2">
            <div class="ui header right aligned">@lang('project.total')</div>
        </th>
        <th>
            <div class="ui header">
                {{ ($crewTotal + $expenseTotal) }}
            </div>
        </th>
    </tr>
    <tr>
        <th colspan="2">
            <div class="ui header right aligned">@lang('project.total-collected')</div>
        </th>
        <th>
            <div class="ui header">
                {{ $fund->project->totalCollected() }}
            </div>
        </th>
    </tr>

    </tfoot>
</table>
