@extends('layouts.master')

@section('content')

<div class="column">

    <div class="ui segment">
        <table class="ui celled table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Expected Cost</th>
                <th>Supported</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>

            @foreach($project->expenditures as $expenditure)

            <tr>
                <td>
                    <h4 class="ui image header">
                        <img src="{{ asset('img/avatar/male.png') }}" class="ui mini rounded image">

                        <div class="content">
                            {{ $expenditure->expenditurable->name }}
                            <div class="sub header">{{ $expenditure->expenditurable->position->name }}</div>
                        </div>
                    </h4>
                </td>

                <td>
                    {{ $expenditure->expenditurable->cost }}
                </td>

                <td>
                    {{ $expenditure->backers->sum('pivot.amount') }}
                </td>
                <td>
                    {{ $expenditure->expenditurable->description }}
                </td>

                <td class="collapsing">
                    <form class="ui form" method="post"
                          action="{{ route('project.fund.store', $expenditure->id) }}">
                        {{ csrf_field() }}
                        <div class="inline fields">
                            @include('partials.field', ['name' => 'amount', 'label' => trans('forms.amount')])
                            <button class="olive circular ui icon button">
                                <i class="icon thumbs up"></i>
                            </button>
                        </div>
                    </form>
                </td>
            </tr>
            @endforeach
            </tbody>

        </table>
    </div>

</div>

@endsection