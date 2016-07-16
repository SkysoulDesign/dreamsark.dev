<h2>@lang('project.backers')</h2>
<table class="ui celled table">
    <thead>
    <tr>
        <th>@lang('project.backer-user')</th>
        <th>@lang('project.backer-amount')</th>
        <th>@lang('project.backer-date')</th>
    </tr>
    </thead>
    <tbody>
    @php @endphp
    @foreach($backers as $backer)
        <tr>
            <td>
                {{ $backer->user->name or $backer->user->username }}
            </td>
            <td>
                {{ $backer->pivot->amount }}
            </td>
            <td>
                @if($backer->pivot->created_at) {{ $backer->pivot->created_at->format('m/d/Y H:i') }} @endif
            </td>
        </tr>
    @endforeach
    </tbody>
    <tfoot>
    <th colspan="2">
        <div class="ui header right aligned">@lang('project.collected')</div>
    </th>
    <th>
        <div class="ui header">{{ collect($backers)->pluck('pivot')->sum('amount') }}</div>
    </th>
    </tfoot>
</table>