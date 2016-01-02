<form class="ui form error" action="{{ route('login.store') }}" method="post">

    {!! csrf_field() !!}

    @include('partials.field', ['name' => 'email', 'label'=> trans('forms.email'), 'placeholder'=> trans('forms.email'), 'type' => 'email'])

    @include('partials.field', ['name' => 'password', 'label'=> trans('forms.password'), 'placeholder'=> trans('forms.email'),'type' => 'password'])

    <button class="ui button" type="submit">@lang('forms.login')</button>

</form>