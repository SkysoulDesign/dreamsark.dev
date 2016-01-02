<h1 class="ui header">{{ $project->name }}</h1>

<form class="ui form warning error" action="{{ route('user.project.script.store', $project->id) }}" method="post">

    {!! csrf_field() !!}

    @include('partials.textarea', ['name' => 'content', 'label' => trans('forms.script-description')])

    @include('partials.field', ['name' => 'reward', 'label'=> trans('forms.reward'), 'placeholder'=> trans('forms.reward'), 'type' => 'text'])

    <div class="ui segment">
        <div class="field">
            <label>{{ trans('forms.due-date') }}</label>

            <div class="field">
                <input id="datetime" name="voting_date" type="text"
                       data-lang="{{ auth()->user()->settings->language == 'cn' ? 'ch' : 'en' }}">
            </div>

        </div>
    </div>

    <button class="ui primary button" type="submit">@lang('forms.save-draft')</button>

    <a id="publish" href="#" class="ui olive button">@lang('forms.publish')</a>

    <script>
        document.getElementById('publish').addEventListener('click', function () {
            $form = this.parentElement;
            $form.action = '{{ route('project.script.store', $project->id)  }}';
            $form.submit();
        })
    </script>

</form>