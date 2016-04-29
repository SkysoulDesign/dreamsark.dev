<h1 class="ui header">{{ $project->name }}</h1>

<form class="ui form warning error" action="{{ route('project.script.store', $project->id) }}" method="post">

    {!! csrf_field() !!}

    @include('partials.textarea', ['name' => 'content', 'label' => trans('forms.script-description')])

    @include('partials.field', ['name' => 'reward', 'label'=> trans('forms.reward'), 'placeholder'=> trans('forms.reward'),
     'type' => 'number', 'value' => old('reward', (isset($project->getNextStageReward[0])?$project->getNextStageReward[0]->amount:1))
     ])

    <div class="ui segment">
        <div class="field">
            <label>{{ trans('forms.due-date') }}</label>

            <div class="field">
                <input id="datetime" name="voting_date" type="date"
                       data-lang="{{ auth()->user()->settings->language == 'cn' ? 'ch' : 'en' }}">
            </div>

        </div>
    </div>

    {{--<button class="ui primary button" type="submit">@lang('forms.save-draft')</button>--}}

    <button class="ui olive button" name="save_publish" value="p" type="submit">@lang('forms.publish')</button>

</form>