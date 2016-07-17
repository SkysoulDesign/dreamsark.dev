@extends('layouts.master', ['class' => 'admin-page'])

@section('content')

    @include('user.partials.header')

    <div class="row +margin-top +margin-bottom">
        <div class="small-12">
            <div class="column">

                <div class="ui segment">
                    <h2>{{ $project->name }}</h2>
                    <h3>@lang('project.fund')</h3>
                    <form class="ui form" method="post" action="{{ route('project.fund.store', $project->id) }}">
                        {{ csrf_field() }}
                        <div class="field">
                            <label>@lang('forms.amount')</label>
                            <input type="text" name="amount" placeholder="@lang('forms.amount')">
                        </div>
                        <div class="ui buttons">
                            <button class="ui positive button" type="submit">@lang('back-this-project')</button>
                            <div class="or"></div>
                            <a class="ui grey button" href="{{ route('project.show', $project->id) }}">
                                <i class="reply icon"></i>
                                @lang('project.back-to-view')
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>

@endsection
