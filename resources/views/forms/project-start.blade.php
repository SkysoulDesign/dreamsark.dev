<form class="ui form warning error" action="{{ route('project.store') }}" method="post">

    {!! csrf_field() !!}

    @include('partials.field', ['name' => 'name', 'label' => trans('forms.project-name'), 'value' => old('name')])

    @include('partials.textarea', ['name' => 'content', 'label' => trans('forms.description'), 'value' => old('content')])

    <div class="ui segments">

        <div class="ui segment">
            {{--@include('partials.field', ['name' => 'reward', 'type' => 'number', 'value' => old('reward', 1)])--}}
            <div class="field">
                <div class="two fields">
                    @php $rewardArr = old('reward', []) @endphp
                    <div class="field required">
                        <label>@lang('forms.reward-for-idea')</label>
                        <input type="number" name="reward[idea]" placeholder="@lang('forms.reward-for-idea')"
                               value="{{ $rewardArr['idea'] or '' }}"/>
                    </div>
                    <div class="field">
                        <label>@lang('forms.reward-for-synapse')</label>
                        <input type="number" name="reward[synapse]" placeholder="@lang('forms.reward-for-synapse')"
                               value="{{ $rewardArr['synapse'] or '' }}"/>
                    </div>
                    <div class="field">
                        <label>@lang('forms.reward-for-script')</label>
                        <input type="number" name="reward[script]" placeholder="@lang('forms.reward-for-script')"
                               value="{{ $rewardArr['script'] or '' }}"/>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="ui segment">
        @include('partials.field-multiple', array(
        'label' => trans('forms.idea-submission-last-date'),
        'fields' => [
                ['name' => 'voting_date', 'placeholder' => trans('forms.first-name'), 'type' => 'date', 'value' => old('voting_date')]
            ],
        'class' => 'two'
        ))
    </div>

    {{--<button class="ui primary button" name="save_draft" value="d" type="submit">@lang('forms.save-draft')</button>--}}
    <button class="ui olive button" name="save_publish" value="p" type="submit">@lang('forms.publish')</button>

    <script>
        /*document.getElementById('publish').addEventListener('click', function () {
            $form        = this.parentElement;
            $form.action = '{{ route('project.store')  }}';
            $form.submit();
        })*/
    </script>

</form>