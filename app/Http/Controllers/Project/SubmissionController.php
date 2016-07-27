<?php

namespace DreamsArk\Http\Controllers\Project;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\Project\Submission\SubmissionCreation;
use DreamsArk\Jobs\Project\Submission\CreateSubmissionJob;
use DreamsArk\Jobs\Project\Submission\UpdateSubmissionJob;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Submission;
use Illuminate\Http\Request;

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
            new CreateSubmissionJob($project, $request->user(), $request->all())
        );

        return redirect()->back();
    }

    /**
     * Update Submission
     *
     * @param Request $request
     * @param Project $project
     * @param Submission $submission
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Project $project, Submission $submission)
    {
        /**
         * Update Submission
         */
        $this->dispatch(
            new UpdateSubmissionJob($submission, $request->all())
        );

        return redirect()->back();
    }

}
