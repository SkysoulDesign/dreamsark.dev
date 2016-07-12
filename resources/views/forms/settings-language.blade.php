<form class="ui form error" action="{{ route('settings.update', auth()->user()->settings->id ) }}" method="post">

    {!! csrf_field() !!}

    @include('partials.select-with-icon',
    [
        'name' => 'language',
        'placeholder' => trans('forms.select-language'),
        'collection' => [
            'en' => ['English', 'us flag'],
            'cn' => ['Chinese', 'cn flag']
        ]
    ])

    <button class="ui button" type="submit">@lang('forms.save')</button>

</form>