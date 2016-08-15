<ark-tab content="tab-investments" icon="user" {{ (isset($active) && $active) ? 'active' : '' }}>
    @lang('project.invest')
    @push('tab-item')
    <div id="tab-investments" class="row align-center">

        <div class="small-10 columns segment --large-padding --centered">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque dolorum eum explicabo itaque odio quo
            sint tenetur! Aliquid, deleniti exercitationem fugiat itaque, iure nemo nobis non, odio perspiciatis
            quod reiciendis?
        </div>

        <div class="small-10">
            <table class="table --attached-top">
                <thead>
                <tr>
                    <th>@lang('project.project')</th>
                    <th>@lang('project.amount')</th>
                    <th>@lang('project.backed-date')</th>
                </tr>
                </thead>
                <tbody>

                @foreach($investments as $project)

                    <tr>
                        <td>
                            <a href="{{ route('project.show', $project) }}">
                                {{ $project->name }}
                            </a>
                        </td>

                        <td>{{ $project->pivot->amount }}</td>

                        <td>{{ $project->pivot->created_at }}</td>

                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

    </div>
    @endpush
</ark-tab>
