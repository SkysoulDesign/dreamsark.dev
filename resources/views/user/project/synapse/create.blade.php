@extends('user.project.create')

@section('content')

    @include('user.partials.header', ['header' => false])
    @include('user.project.partials.header')

    @include('user.project.partials.project-create-edit-form', [
        'action' => route('project.synapse.store', $project),
        'submitText' => trans('project.synapse-start'),
        'headerText' => trans('project.synapse-create'),
        'nameInput' => false
    ])

@stop
