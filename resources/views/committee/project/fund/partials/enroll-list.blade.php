<h2>@lang('project.enroll-list')</h2>
<table class="ui celled table">
    <thead>
    <tr>
        <th>@lang('project.enroll-user')</th>
        <th>@lang('project.enroll-date')</th>
        <th>@lang('navbar.actions')</th>
    </tr>
    </thead>
    <tbody>

    @foreach($enrollable as $expenditure)
        <tr>
            <td colspan="3">
                <div class="ui brown ribbon label">{{ $expenditure->expenditurable->name }}</div>
            </td>
        </tr>
        @php $profile = $expenditure->expenditurable->profile->name; @endphp
        @if(!$expenditure->enrollers->isEmpty())
            @foreach($expenditure->enrollers as $enroller)
                <tr>
                    <td>{{ $enroller->user->name or $enroller->user->username }}</td>
                    <td>@if($enroller->created_at) {{ $enroller->created_at->format('m/d/Y H:i') }} @endif</td>
                    <td>
                        <div class="ui small basic icon buttons">
                            <a target="_blank" class="ui button" href="{{ route('public.profile.show', [$profile, $enroller->user->username]) }}">
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
                <td colspan="3">@lang('project.no-enroll')</td>
            </tr>
        @endif
    @endforeach
    </tbody>
</table>