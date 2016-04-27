<form class="ui form warning error" action="{{ route('user.project.update', $project->id) }}" method="post">

    {!! csrf_field() !!}

    @include('partials.field', ['name' => 'name', 'label' => trans('forms.project-name'), 'value' => old('name', $project->name)])

    @include('partials.textarea', ['name' => 'content', 'label' => trans('forms.description'), 'value' => old('content', $project->content)])

    <div class="ui segments">

        <div class="ui segment">
            @include('partials.field', ['name' => 'reward', 'type' => 'number', 'value' => old('reward', $project->reward)])
        </div>

    </div>

    <div class="ui segment">
        @php $dateTimeArr = explode(' ', $project->voting_date); @endphp
        @include('partials.field-multiple', array(
        'label' => trans('forms.due-date'),
        'fields' => [
                ['name' => 'voting_date', 'placeholder' => trans('forms.first-name'), 'type' => 'date', 'value' => old('voting_date', @$dateTimeArr[0])]
            ],
        'class' => 'two'
        ))
    </div>

    <button class="ui primary button" type="submit" name="save_draft" value="d">@lang('forms.save')</button>

</form>