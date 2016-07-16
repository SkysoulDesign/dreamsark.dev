<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Requests\Project\Submission\SubmissionCreation;
use DreamsArk\Jobs\Project\Submission\SubmitJob;
use DreamsArk\Models\Project\Project;

/**
 * Class SubmissionController
 *
 * @package DreamsArk\Http\Controllers\Project
 */
class SubmissionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param Project $project
     * @param SubmissionCreation $request
     * @return \Illuminate\Http\Response
     * @internal param Idea $idea
     */
    public function store(SubmissionCreation $request, Project $project)
    {

        $this->dispatch(
            new SubmitJob($project, $request->user(), $request->all())
        );

        return redirect()->back();
    }
}
