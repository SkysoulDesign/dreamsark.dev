<form class="ui form warning error" action="{{ route('user.project.store') }}" method="post">

    {!! csrf_field() !!}

    @include('partials.field', ['name' => 'name', 'label' => trans('forms.project-name'), 'value' => $project->name])

    @include('partials.select', ['name' => 'type', 'default' => $project->type, 'collection' => ['idea' => 'seeking-idea', 'synapse' => 'seeking-synapse', 'script' => 'seeking-script']])

    @include('partials.textarea', ['name' => 'content', 'label' => trans('forms.description'), 'value' => $project->content])

    <div class="ui segments">

        <div class="ui segment">
            @include('partials.field', ['name' => 'reward', 'label' => trans('forms.reward'), 'value' => $project->reward])
        </div>

    </div>

    <div class="ui segment">
        <?php $dateTimeArr = explode(' ', $project->voting_date); ?>
        @include('partials.field-multiple', array(
        'label' => trans('forms.due-date'),
        'fields' => [
                ['name' => 'voting_date', 'placeholder' => trans('forms.first-name'), 'type' => 'date', 'value' => @$dateTimeArr[0]],
                ['name' => 'vote_time', 'placeholder' => trans('forms.last-name'), 'type' => 'time', 'value' => @$dateTimeArr[1]]
            ],
        'class' => 'two'
        ))
    </div>

    <button class="ui primary button" type="submit">@lang('forms.save')</button>

</form>