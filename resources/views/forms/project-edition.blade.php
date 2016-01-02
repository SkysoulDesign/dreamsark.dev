<form class="ui form warning error" action="{{ route('user.project.store') }}" method="post">

    {!! csrf_field() !!}

    @include('partials.field', ['name' => 'name', 'label' => trans('forms.project-name'), 'placeholder' => $project->name])

    @include('partials.select', ['name' => 'type', 'collection' => ['idea' => trans('forms.seeking-idea'), 'synapse' => trans('forms.seeking-synapse'), 'script' => trans('forms.seeking-script')]])

    @include('partials.textarea', ['name' => 'content', 'label' => trans('forms.description'), 'placeholder' => $project->content])

    <div class="ui segments">

        <div class="ui segment">
            @include('partials.field', ['name' => 'reward', 'label' => trans('forms.reward')])
        </div>

    </div>

    <div class="ui segment">
        @include('partials.field-multiple', array(
        'label' => trans('forms.due-date'),
        'fields' => [
                ['name' => 'voting_date', 'placeholder' => trans('forms.first-name'), 'type' => 'date'],
                ['name' => 'vote_time', 'placeholder' => trans('forms.last-name'), 'type' => 'time']
            ],
        'class' => 'two'
        ))
    </div>

    <button class="ui primary button" type="submit">@lang('forms.save')</button>

</form>