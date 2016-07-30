<?php

namespace DreamsArk\Http\Controllers\Project\Synapse;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\Project\SynapseScriptCreation;
use DreamsArk\Jobs\Project\Stages\CreateProjectStageJob;
use DreamsArk\Jobs\Project\Stages\Synapse\CreateSynapseJob;
use DreamsArk\Models\Project\Project;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;

/**
 * Class SynapseController
 *
 * @package DreamsArk\Http\Controllers\Project\Synapse
 */
class SynapseController extends Controller
{

    /**
     * Show a specific project.
     *
     * @param Project $project
     * @param ProjectRepositoryInterface $repository
     *
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
     * @param SynapseScriptCreation $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Project $project, SynapseScriptCreation $request)
    {
        $this->dispatch(
            new CreateProjectStageJob($project, 'synapse', $request->except('reward'), $request->input('reward'))
        );

        return redirect()->route('project.show', $project);
    }
}
