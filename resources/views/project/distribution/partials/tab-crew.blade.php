<ark-tab content="tab-crew" icon="circle" {{ (isset($active) && $active) ? 'active' : '' }}>
    @lang('project.crew')
    @push('tab-item')
    <div id="tab-crew" class="row align-center +margin-top">

        <div class="small-12 columns">
            <header class="header --with-divider +uppercase --centered">
                @lang('project.crew')
            </header>
        </div>

        <div class="small-10">
            <table class="table">
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

                @foreach($expenditures as $expenditure)

                    @set($crew, $expenditure->expenditurable)

                    <tr>
                        <td>
                            <a href="#">{{ $crew->name }}</a>
                            <p>@lang("positions.{$crew->profile->name}")</p>
                        </td>

                        <td>
                            {{ $crew->description }}
                        </td>

                        <td>
                            {{ $crew->cost }}
                        </td>

                        <td>
                            <a href="{{ route('public.profile.show', [$crew->profile->name, $crew->enroller->user->username]) }}">
                                {{ $crew->enroller->user->present()->name }}
                            </a>
                        </td>
                        <td>
                            {{  $crew->enroller->votes->sum('amount') }}
                        </td>
                        <td>
                            0
                        </td>

                    </tr>
                @endforeach

                </tbody>
            </table>

        </div>

    </div>
    @endpush
</ark-tab>
