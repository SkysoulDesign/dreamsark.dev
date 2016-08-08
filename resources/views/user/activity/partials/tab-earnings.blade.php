<ark-tab content="tab-earnings" icon="user" {{ (isset($active) && $active) ? 'active' : '' }}>
    @lang('project.earnings')
    @push('tab-item')
    <div id="tab-earnings" class="row align-center">

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
                    <th>@lang('project.type')</th>
                    <th>@lang('project.reward-amount')</th>
                    <th>@lang('project.earning-date')</th>
                </tr>
                </thead>
                <tbody>
                @foreach($earnings as $submission)

                    <tr>
                        <td>
                            <a href="{{ route('project.show', $submission->submissible->project) }}">
                                {{ $submission->submissible->project->name }}
                            </a>
                        </td>

                        <td>@lang("project.{$submission->submissible->getStageName()}")</td>

                        <td>{{ $submission->votes->sum('pivot.amount') }}</td>

                        <td>{{ $submission->submissible->updated_at->format('m/d/Y H:i A') }}</td>

                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

    </div>
    @endpush
</ark-tab>
