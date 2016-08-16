<?php

namespace DreamsArk\Http\Controllers\Project\Idea;

use DreamsArk\Commands\Project\Submission\VoteOnSubmissionCommand;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\Idea\IdeaSubmission;
use DreamsArk\Http\Requests\Idea\SubmissionVoting;
use DreamsArk\Models\Project\Submission;

/**
 * Class SubmissionController
 *
 * @package DreamsArk\Http\Controllers\Project\Idea
 */
class SubmissionController extends Controller
{

    /**
     * Vote on a Submission
     *
     * @param SubmissionVoting $request
     * @param Submission $submission
     * @return \Illuminate\Http\Response
     */
    public function vote(SubmissionVoting $request, Submission $submission)
    {

        $this->dispatch(
            new VoteOnSubmissionCommand($request->get('amount'), $submission, $request->user())
        );

        return redirect()->back();
    }

}
