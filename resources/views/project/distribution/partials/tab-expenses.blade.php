<ark-tab content="tab-expenses" icon="dot-circle-o" {{ (isset($active) && $active) ? 'active' : '' }}>
    @lang('project.expense')
    @push('tab-item')
    <div id="tab-expenses" class="row align-center +margin-top">

        <div class="small-12 columns">
            <header class="header --with-divider +uppercase --centered">
                @lang('project.expense')
            </header>
        </div>

        <div class="small-10">
            <table class="table">
                <thead>
                <tr>
                    <th>@lang('forms.name')</th>
                    <th>@lang('project.description')</th>
                    <th>@lang('project.cost')</th>
                    <th>@lang('project.invest-actual-cost')</th>
                </tr>
                </thead>
                <tbody>

                @foreach($expenditures as $expenditure)
                    <tr>
                        <td>
                            {{ $expenditure->expenditurable->name }}
                        </td>

                        <td>
                            {{ $expenditure->expenditurable->description }}
                        </td>

                        <td>
                            {{ $expenditure->expenditurable->cost }}
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
