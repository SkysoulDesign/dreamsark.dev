<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Commands\Project\Submission\SubmitCommand;
use DreamsArk\Http\Requests\Project\Submission\Submissioning;
use DreamsArk\Models\Project\Project;
use Illuminate\Http\Request;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Controllers\Controller;

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
        $command = new SubmitCommand($project, $request->user(), $request->all());
        $this->dispatch($command);
        return redirect()->back();
    }
}
