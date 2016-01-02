<form class="ui form warning error" action="{{ route('user.project.store') }}" method="post">

    {!! csrf_field() !!}

    @include('partials.field', ['name' => 'name', 'label' => trans('forms.project-name')])

    @include('partials.select', ['name' => 'type', 'collection' => ['idea' => 'seeking-idea', 'synapse' => 'seeking-synapse', 'script' => 'seeking-script']])

    @include('partials.textarea', ['name' => 'content', 'label' => trans('forms.description')])

    <div class="ui segments">

        <div class="ui segment">
            @include('partials.field', ['name' => 'reward', 'type' => 'text'])
        </div>

    </div>

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
            $form.action = '{{ route('project.store')  }}';
            $form.submit();
        })
    </script>

</form>