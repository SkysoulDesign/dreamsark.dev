@extends('layouts.master', ['class'=>'project-page'])

@section('content')

    @include('user.partials.header', ['header' => false])
    @include('user.project.partials.header')

    @include('user.project.partials.project-create-edit-form', [
        'action' => route('user.project.store'),
        'submitText' => trans('project.creation-notes'),
        'headerText' => trans('project.start-project'),
        'nameInput' => true
    ])

@stop
