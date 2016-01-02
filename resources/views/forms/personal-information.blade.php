<form class="ui form error" action="{{ route('register.update') }}" method="post">

    {!! csrf_field() !!}

    @include('partials.field', ['name' => 'username', 'type' => 'text'])
    @include('partials.field', ['name' => 'email', 'type' => 'email'])

    <button class="ui button" type="submit">@lang('forms.save')</button>

</form>