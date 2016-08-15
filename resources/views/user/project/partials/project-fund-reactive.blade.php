<ark-form class="align-center --overlapped" method="patch" action="{{ route('user.project.fund.update', $project) }}">

    <ark-form-header>
        Edit Project
    </ark-form-header>

    <table class="small-9 table --attached-top --color-success +shadow +no-round-bottom +no-margin-bottom">
        <thead>
        <tr>
            <th>@lang('forms.name')</th>
            <th>@lang('project.type')</th>
            <th>@lang('project.cost')</th>
            <th>@lang('project.description')</th>
        </tr>
        </thead>
        <tbody>

        @foreach($project->stage->enrollable as $expenditure)
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
                    @set($stage,strtolower(class_basename($expenditure->expenditurable)))
                    @lang("committee.$stage")
                </td>

                <td>
                    {{ $expenditure->expenditurable->cost or $expenditure->expenditurable->dispenses->sum('amount') }}
                </td>

                <td>
                    {{ $expenditure->expenditurable->description or '...' }}
                </td>
            </tr>
        @endforeach

        </tbody>
    </table>

    <div slot="content">

        <ark-input name="voting_date"
                   type="datetime-local"
                   placeholder="@lang('project.name')"
                   caption="@lang('project.creation-voting-description')"
                   label="@lang('forms.due-date')">
        </ark-input>

        <div class="small-12 columns divider --simple"></div>

        <ark-button color="success" class="--medium" class="+center-on-mobile">
            @lang('forms.publish')
        </ark-button>

        <div class="small-12 columns form__description +center-on-mobile">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda, aut dicta dolorem ea, esse est
            ex facere itaque nemo nesciunt praesentium quae quas quo sunt vel velit voluptatem voluptatibus?
        </div>

    </div>

</ark-form>
