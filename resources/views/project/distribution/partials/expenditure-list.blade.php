<table class="ui celled table">
    <thead>
    <tr>
        <th colspan="3">
            <div class="ui violet ribbon label">@lang('project.expense')</div>
        </th>
    </tr>
    <tr>
        <th>@lang('forms.name')</th>
        <th>@lang('project.description')</th>
        <th>@lang('project.cost')</th>
    </tr>
    </thead>
    <tbody>
    @foreach($expenditures as $expenditure)
        <tr>
            <td>
                <h4 class="ui image header">
                    <div class="content">
                        {{ $expenditure->expenditurable->name }}
                        <div class="sub header">
                            {{ (is_object($expenditure->expenditurable->profile) ? $expenditure->expenditurable->profile->display_name : '') }}
                        </div>
                    </div>
                </h4>
            </td>
            <td>
                {{ $expenditure->expenditurable->description }}
            </td>
            <td>
                {{ $expenditure->expenditurable->cost }}
            </td>
        </tr>
    @endforeach
    </tbody>
    <tfoot>
    <tr>
        <th colspan="2">
            <div class="ui header right aligned">@lang('project.sub-total')</div>
        </th>
        <th>
            <div class="ui header">
                {{ collect($expenditures)->pluck('expenditurable')->sum('cost') }}
            </div>
        </th>
    </tr>
    </tfoot>
</table>