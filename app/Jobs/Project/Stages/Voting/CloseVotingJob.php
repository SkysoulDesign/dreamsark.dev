<?php

namespace DreamsArk\Jobs\Project\Stages\Voting;

use DreamsArk\Events\Project\Vote\VotingHasFailed;
use DreamsArk\Events\Project\Vote\VotingHasFinished;
use DreamsArk\Jobs\Job;
use DreamsArk\Jobs\Project\FailProjectStageJob;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Vote;
use Illuminate\Support\Collection;

/**
 * Class CloseVotingJob
 *
 * @package DreamsArk\Jobs\Project\Stages\Voting
 */
class CloseVotingJob extends Job
{
    /**
     * @var Vote
     */
    private $vote;

    /**
     * Create a new command instance.
     *
     * @param Vote $vote
     */
    public function __construct(Vote $vote)
    {
        $this->vote = $vote;
    }

    /**
     * Execute the command.
     */
    public function handle()
    {

        if ($this->vote->votable instanceof Fund) {
            return dispatch(
                new CloseEnrollVotingJob($this->vote)
            );
        }

        /**
         * Get which Submission had more Votes
         */
        /** @var Collection $submissions */
        $submissions = $this->vote
            ->getAttribute('votable')
            ->submissions->load('votes')
            ->keyBy('id');

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
            dispatch(new FailProjectStageJob(
                $this->vote->votable, FAIL_REASON_NO_VOTES
            ));

            /**
             * Announce Vote has Failed
             */
            event(new VotingHasFailed($this->vote));

            return;
        }

        /**
         * Retrieve Winner Submission
         */
        $submission_winner = $submissions->pull($votes->sort()->keys()->pop());

        /**
         * Announce VoteHasFinished
         */
        event(new VotingHasFinished(
            $this->vote, $submission_winner, $submissions
        ));
    }
}
