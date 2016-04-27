<form class="ui form warning error" action="{{ route('user.project.store') }}" method="post">

    {!! csrf_field() !!}

    @include('partials.field', ['name' => 'name', 'label' => trans('forms.project-name'), 'value' => old('name')])

    @include('partials.textarea', ['name' => 'content', 'label' => trans('forms.description'), 'value' => old('content')])

    <div class="ui segments">

        <div class="ui segment">
            @include('partials.field', ['name' => 'reward', 'type' => 'number', 'value' => old('reward', 1)])
        </div>

    </div>

    <div class="ui segment">
        @include('partials.field-multiple', array(
        'label' => trans('forms.due-date'),
        'fields' => [
                ['name' => 'voting_date', 'placeholder' => trans('forms.first-name'), 'type' => 'date', 'value' => old('voting_date')]/*,
                ['name' => 'vote_time', 'placeholder' => trans('forms.last-name'), 'type' => 'time']*/
            ],
        'class' => 'two'
        ))
    </div>

    <button class="ui primary button" name="save_draft" value="d" type="submit">@lang('forms.save-draft')</button>

    <button class="ui olive button" name="save_publish" value="p" type="submit">@lang('forms.publish')</button>

    {{--<a id="publish" href="#" class="ui olive button">@lang('forms.publish')</a>--}}

    <script>
        document.getElementById('publish').addEventListener('click', function () {
            $form        = this.parentElement;
            $form.action = '{{ route('project.store')  }}';
            $form.submit();
        })
    </script>

</form>