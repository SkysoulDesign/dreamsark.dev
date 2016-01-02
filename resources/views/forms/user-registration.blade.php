<form class="ui form error" action="{{ route('register.store') }}" method="post">

    {!! csrf_field() !!}

    @include('partials.field', ['name' => 'username', 'type' => 'text'])

    @include('partials.field', ['name' => 'email', 'type' => 'email'])

    @include('partials.field', ['name' => 'password', 'type' => 'password'])

    @include('partials.field', ['name' => 'password_confirmation', 'type' => 'password'])

    <button class="ui button" type="submit">@lang('forms.submit')</button>

</form>