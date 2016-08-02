@extends('layouts.master', ['class' => 'project-page'])

@section('content')
    @set($stage, $project->stage->getStageName())
    @include("project.$stage.show")
@stop
