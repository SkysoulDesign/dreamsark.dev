<table class="table --attached-top --color-primary">
    <thead>
    <tr>
        <th>@lang('forms.name')</th>
        <th>@lang('project.type')</th>
        <th>@lang('project.cost')</th>
        <th>@lang('project.description')</th>
        <th>@lang('forms.action')</th>
    </tr>
    </thead>
    <tbody>

    @foreach($review->project->expenditures as $expenditure)
        <tr>
            <td>
                <div class="row align-middle">
                    <div class="small-2 columns">
                        @if($expenditure->expenditurable->profile)
                            @set($name, $expenditure->expenditurable->profile->name)
                            <div class="+profile-color-{{ $name }}">
                                <img class="+circle" src="{{ asset("img/profile/{$name}") }}.png">
                            </div>
                        @endif
                    </div>
                    <div class="columns">
                        <div class="header --medium">
                            {{ $expenditure->expenditurable->name }}
                            @if($expenditure->expenditurable->profile)
                                <p>@lang("positions.{$expenditure->expenditurable->profile->name}")</p>
                            @endif
                        </div>
                    </div>
                </div>
            </td>

            <td>
                @set($myVari,strtolower(class_basename($expenditure->expenditurable)))
                @lang("committee.$myVari")
            </td>

            <td>
                {{ $expenditure->expenditurable->cost }}
            </td>
            <td>
                {{ $expenditure->expenditurable->description or '...' }}
            </td>

            <td class="collapsing">
                <ark-form method="delete"
                          action="{{ route('committee.project.expenditure.destroy', $expenditure) }}">
                    <ark-button color="danger">@lang('project.remove')</ark-button>
                </ark-form>
            </td>

        </tr>
    @endforeach

    </tbody>
</table>
