@extends('layouts.master')

@section('content')

    <div class="column">

        <div class="ui segment">

            <form class="ui form" method="post" action="{{ route('project.fund.store', $project->id) }}">
                {{ csrf_field() }}
                <div class="field">
                    <label>@lang('forms.amount')</label>
                    <input type="text" name="amount" placeholder="@lang('forms.amount')">
                </div>
                <button class="ui button" type="submit">@lang('back-this-project')</button>
            </form>

        </div>

    </div>

@endsection