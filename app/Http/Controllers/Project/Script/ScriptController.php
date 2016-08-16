<?php

namespace DreamsArk\Http\Controllers\Project\Script;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\Project\SynapseScriptCreation;
use DreamsArk\Models\Project\Project;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;
use Illuminate\Http\Request;

/**
 * Class ScriptController
 *
 * @package DreamsArk\Http\Controllers\Project\Script
 */
class ScriptController extends Controller
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
     * @param SynapseScriptCreation|Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Project $project, SynapseScriptCreation $request)
    {
        dd('verify this');
//        $this->dispatch(
//            new CreateProjectStageJob($project, 'script', $request->except('reward'), $request->input('reward'))
//        );
//
//        return redirect()->route('project.show', $project);
    }
}
