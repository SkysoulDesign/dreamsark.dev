@extends('layouts.master', ['class'=>'project-page'])

@section('content')

    @include('user.partials.header', ['header' => false])
    @include('user.project.partials.header')

    @if($project->stage instanceof \DreamsArk\Models\Project\Stages\Fund)

        @include('user.project.partials.project-fund-reactive')

    @else

        @include('user.project.partials.project-create-edit-form', [
            'method' => 'patch',
            'action' => route('user.project.update', $project),
            'submitText' => trans('forms.update'),
            'bind' =>  collect([ 'name'=> $project->name, 'content'=> $project->stage->content ]),
            'headerText' => trans('project.reactive'),
            'nameInput' => ($project->stage instanceof \DreamsArk\Models\Project\Stages\Idea)
        ])

    @endif

@stop
