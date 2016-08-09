@extends('user.project.create')

@section('content')

    @include('user.partials.header', ['header' => false])
    @include('user.project.partials.header')

    @include('user.project.partials.project-create-edit-form', [
        'action' => route('project.synapse.store', $project),
        'submitText' => @lang('project.synapse-start'),
        'headerText' => @lang('project.synapse-create'),
        'nameInput' => false
    ])

@stop
