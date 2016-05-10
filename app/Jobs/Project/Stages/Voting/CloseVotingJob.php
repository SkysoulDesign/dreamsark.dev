<?php

namespace DreamsArk\Jobs\Project\Stages\Voting;

use DreamsArk\Events\Project\Vote\VotingHasFailed;
use DreamsArk\Events\Project\Vote\VotingHasFinished;
use DreamsArk\Jobs\Job;
use DreamsArk\Jobs\Project\FailIdeaSynapseScriptStageJob;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Vote;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Repositories\Project\Vote\VoteRepositoryInterface;
use Illuminate\Support\Collection;

class CloseVotingJob extends Job
{

    /**
     * @var Vote
     */
    private $vote;

    /**
     * Create a new command instance.
     *
     * @param \DreamsArk\Models\Project\Stages\Vote $vote
     */
    public function __construct(Vote $vote)
    {
        $this->vote = $vote;
    }

    /**
     * Execute the command.
     *
     * @param Submission $submission
     * @param VoteRepositoryInterface $repository
     * @return bool|void
     */
    public function handle(Submission $submission, VoteRepositoryInterface $repository)
    {

        if ($this->vote->votable instanceof Fund) {
            //dd('wait it`s a fund function on CloseVotingJob');
            return false;
        }

        /**
         * Get which Submission had more Votes
         * @todo Improve this messy function
         */
        /** @var Collection $submissions */
        $submissions = $this->vote->votable->submissions->load('votes');
        $votes = $submissions->pluck('votes', 'id')->map(function ($item) {
            return $item->sum('pivot.amount');
        });

        /**
         * if don't have any votes there will be no winner, so declare this failed
         */
        if ($votes->sum() <= 0) {

            /**
             * Fail The project stage
             */
            dispatch(new FailIdeaSynapseScriptStageJob($this->vote->votable));

            /**
             * Announce Vote has Failed
             */
            event(new VotingHasFailed($this->vote));

            return;
        }

        /**
         * Retrieve Winner Submission
         */
        $submission_winner = $submission->findOrFail($votes->sort()->keys()->pop());

        /**
         * Refund Losers
         */
        $losers = $submissions->filter(function ($submission) use ($submission_winner) {
            return $submission->id != $submission_winner->id;
        });

        /**
         * Announce VoteHasFinished
         */
        event(new VotingHasFinished($this->vote, $submission_winner, $losers));

    }
}
