<h2>@lang('project.plan-data')</h2>
<table class="ui celled table">
    <thead>
    <tr>
        <th>@lang('project.crew')</th>
        <th>@lang('project.description')</th>
        <th>@lang('project.cost')</th>
        <th>@lang('project.selected-user')</th>
        <th>@lang('project.votes')</th>
        <th>@lang('project.cost-expected')</th>

    </tr>
    </thead>
    <tbody>

    @foreach($enrollable as $expenditure)
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
            <td>
                @php $enroller = $expenditure->expenditurable->enroller; @endphp
                <a class="ui icon" href="{{ route('public.profile.show', [$expenditure->expenditurable->profile->name, $enroller->user->username]) }}">
                    <i class="unhide icon"></i>
                    {{ $enroller->user->name or $enroller->user->username }}
                </a>
            </td>
            <td>
                {{ $enroller->votes->pluck('pivot')->sum('amount') }}
            </td>
            <td>-</td>
        </tr>
    @endforeach

    @php $crewTotal = collect($enrollable)->pluck('expenditurable')->sum('cost'); @endphp
    </tbody>
    <tfoot class="full-width">
    <tr>
        <th colspan="2">
            <div class="ui header right aligned">@lang('project.total')</div>
        </th>
        <th>
            <div class="ui header">
                {{ $crewTotal }}
            </div>
        </th>

        <th>
            <div class="ui header right aligned">@lang('project.total-collected')</div>
        </th>
        <th colspan="2">
            <div class="ui header">
                {{ $project->enrollVoteTotal() }}
            </div>
        </th>
    </tr>

    </tfoot>
</table>