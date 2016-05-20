<h2>@lang('project.enroll-list')</h2>
<table class="ui celled table">
    <thead>
    <tr>
        <th>@lang('project.enroll-user')</th>
        <th>@lang('project.enroll-date')</th>
        <th>@lang('project.no.of-users-voted')</th>
        <th>@lang('project.vote-amount')</th>
        <th>@lang('navbar.actions')</th>
    </tr>
    </thead>
    <tbody>
    @php $totalAmount=0; @endphp

    @foreach($enrollable as $expenditure)
        <tr>
            <td colspan="5">
                <div class="ui brown ribbon label">{{ $expenditure->expenditurable->name . ' ( COST: '. $expenditure->expenditurable->cost .')' }}</div>
            </td>
        </tr>
        @php $profile = $expenditure->expenditurable->profile->name; @endphp
        @if(!$expenditure->enrollers->isEmpty())
            @foreach($expenditure->enrollers as $enroller)
                <tr>
                    <td>
                        {{ $enroller->user->name or $enroller->user->username }}
                        @if($enroller->id == $expenditure->expenditurable->enroller_id)
                            <div class="ui violet horizontal label">@lang('project.winner')</div>
                        @endif
                    </td>
                    <td>@if($enroller->created_at) {{ $enroller->created_at->format('m/d/Y H:i A') }} @endif</td>
                    <td>@if($enroller->enrollvotes) {{ $enroller->enrollvotes->unique('user_id')->count() }} @endif</td>
                    <td>@if($enroller->enrollvotes)
                            @php
                                $row = $enroller->enrollvotes->pluck('amount')->sum();
                                $totalAmount += $row;
                            @endphp
                            {{ $row }}
                        @else
                            0
                        @endif
                    </td>
                    <td>
                        <div class="ui small basic icon buttons">
                            <a target="_blank" class="ui button"
                               href="{{ route('public.profile.show', [$profile, $enroller->user->username]) }}">
                                <i class="info icon"></i>
                            </a>
                            <a class="ui button" href="javascript:;">
                                <i class="delete icon"></i>
                            </a>

                        </div>
                    </td>
                </tr>
            @endforeach
        @else
            <tr>
                <td colspan="5">@lang('project.no-enroll')</td>
            </tr>
        @endif
    @endforeach
    </tbody>

    <tfoot>
    <tr>
        <th colspan="3">
            <div class="ui header right aligned">@lang('project.sub-total')</div>
        </th>
        <th colspan="2">
            <div class="ui header">{{ $totalAmount }}</div>
        </th>
    </tr>
    </tfoot>
</table>