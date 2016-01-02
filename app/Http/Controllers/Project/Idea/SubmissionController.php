<?php

namespace DreamsArk\Http\Controllers\Project\Idea;

use DreamsArk\Commands\Project\Stages\Idea\SubmitIdeaCommand;
use DreamsArk\Commands\Project\Submission\VoteOnSubmissionCommand;
use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Http\Requests\Idea\IdeaSubmission;
use DreamsArk\Http\Requests\Idea\SubmissionVoting;
use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\Project\Submission;

class SubmissionController extends Controller
{


    /**
     * Vote on a Submission
     *
     * @param Submission $submission
     * @param SubmissionVoting $request
     * @return \Illuminate\Http\Response
     */
    public function vote(Submission $submission, SubmissionVoting $request)
    {
        $command = new VoteOnSubmissionCommand($request->get('amount'), $submission, $request->user());
        $this->dispatch($command);
        return redirect()->back();
    }

}
