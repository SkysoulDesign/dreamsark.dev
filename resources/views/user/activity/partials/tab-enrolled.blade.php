<ark-tab content="tab-enrolled" icon="user" {{ (isset($active) && $active) ? 'active' : '' }}>
    @lang('project.enrolled')
    @push('tab-item')
    <div id="tab-enrolled" class="row align-center">

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
                    <th>@lang('project.position')</th>
                    <th>@lang('project.enroll-date')</th>
                </tr>
                </thead>
                <tbody>
                @foreach($enrollers as $expenditure)

                    <tr>

                        <td>
                            <a href="{{ route('project.show', $expenditure->project) }}">
                                {{ $expenditure->project->name }}
                            </a>
                        </td>

                        <td>{{ $expenditure->expenditurable->profile->name }}</td>

                        <td>{{ $expenditure->created_at }}</td>

                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

    </div>
    @endpush
</ark-tab>
