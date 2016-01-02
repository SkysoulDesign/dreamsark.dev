<?php

namespace DreamsArk\Http\Controllers\Project\Synapse;

use DreamsArk\Commands\Project\CreateProjectCommand;
use DreamsArk\Commands\Project\Stages\Synapse\CreateSynapseCommand;
use DreamsArk\Models\Project\Project;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;
use Illuminate\Http\Request;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Controllers\Controller;

class SynapseController extends Controller
{

    /**
     * Show a specific project.
     *
     * @param Project $project
     * @param ProjectRepositoryInterface $repository
     * @return \Illuminate\View\View
     */
    public function show(Project $project, ProjectRepositoryInterface $repository)
    {
        $submissions = $repository->submissions($project->id)->load('user');
        return view('project.show', compact('project'))->with('submissions', $submissions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Project $project
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Project $project, Request $request)
    {
        $this->dispatch(new CreateSynapseCommand($project->id, $request->all()));
        return redirect()->route('projects');
    }

}
