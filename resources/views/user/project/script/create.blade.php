@extends('user.project.create')

@section('content')

    @include('user.partials.header', ['header' => false])
    @include('user.project.partials.header')

    @include('user.project.partials.project-create-edit-form', [
        'action' => route('project.script.store', $project),
        'submitText' => 'Start Script Stage',
        'headerText' => trans('project.script-create'),
        'nameInput' => false
    ])

@stop
