<form class="ui form error" action="{{ route('project.pledge.store', $project->id) }}" method="post">

    {!! csrf_field() !!}

    @include('partials.field', ['name' => 'amount', 'label'=> trans('forms.amount')])

    <button class="ui button" type="submit">@lang('forms.pledge')</button>

</form>