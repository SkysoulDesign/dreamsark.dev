<div id="report-modal" class="ui modal">
    <div class="header">
        @lang('forms.client-feed-back-form')
    </div>
    <div class="content">
        <form id="reportForm" class="ui form" method="post" action="{{ route('report.store') }}">

            <h4 class="ui dividing header">@lang('forms.give-us-your-feed-back')</h4>

            {{ csrf_field() }}

            @include('partials.field', ['name' => 'url', 'placeholder' => trans('forms.page-url'), 'label' => trans('forms.page-url'), 'id' => 'urlAddress'])

            <div class="field">
                <label>@lang('forms.feedback')</label>
                <textarea name="feedback"></textarea>
            </div>

            @include('partials.select-with-icon',
            [
                'name' => 'type',
                'label' => trans('forms.type'),
                'placeholder' => trans('forms.report-feedback'),
                'collection' => [
                    'bug' => [trans('forms.report-bug'), 'bug icon'],
                    'suggestion' => [trans('forms.suggestion'), 'ticket icon']
                ]
            ])

        </form>
    </div>
    <div class="actions">
        <div class="ui black deny button">
            @lang('forms.cancel')
        </div>
        <div class="ui positive right labeled icon button">
            @lang('forms.okay')
            <i class="checkmark icon ok"></i>
        </div>
    </div>
</div>