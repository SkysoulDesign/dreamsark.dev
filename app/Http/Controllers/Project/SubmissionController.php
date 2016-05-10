<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Project\Submission\Submissioning;
use DreamsArk\Jobs\Project\Submission\SubmitJob;
use DreamsArk\Models\Project\Project;

class SubmissionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param Project $project
     * @param Submissioning $request
     * @return \Illuminate\Http\Response
     * @internal param Idea $idea
     */
    public function store(Project $project, Submissioning $request)
    {
        $command = new SubmitJob($project, $request->user(), $request->all());
        $this->dispatch($command);
        return redirect()->back();
    }
}
