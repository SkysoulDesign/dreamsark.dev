@extends('layouts.master')

@section('content')

    <div class="column">

        <div class="ui segment">

            <form class="ui form error" action="{{ route('register.store') }}" method="post">

                {!! csrf_field() !!}

                @include('partials.field', ['name' => 'name', 'type' => 'text'])

                @include('partials.field', ['name' => 'birthday', 'type' => 'date'])

                @include('partials.field', ['name' => 'height', 'type' => 'text'])

                <button class="ui button" type="submit">@lang('forms.submit')</button>

            </form>

        </div>

    </div>

@endsection