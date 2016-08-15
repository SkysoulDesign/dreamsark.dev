<?php

namespace DreamsArk\Jobs\Project\Stages\Voting;

use DreamsArk\Events\Project\Vote\EnrollVotingHasFinished;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Vote;
use Illuminate\Database\Eloquent\Collection;

/**
 * Class CloseEnrollVotingJob
 *
 * @package DreamsArk\Jobs\Project\Stages\Voting
 */
class CloseEnrollVotingJob extends Job
{
    /**
     * @var Vote
     */
    private $vote;

    /**
     * Create a new job instance.
     *
     * @param Vote $vote
     */
    public function __construct(Vote $vote)
    {
        $this->vote = $vote;
    }

    /**
     * Execute the job.
     *
     * @return bool
     */
    public function handle()
    {
        /**
         * Load Relationships
         *
         * @var Fund $fund
         */
        $fund = $this->vote->getAttribute('votable')->load('enrollable.enrollers.votes');

        foreach ($fund->getAttribute('enrollable') as $expenditure) {

            /**
             * Get Voters
             *
             * @var Collection $enrollerList
             */
            $enrollerList = $expenditure->enrollers->pluck('votes')->filter(function ($item) {
                return !$item->isEmpty();
            })->flatten();


            /**
             * to get enrollers' votes total
             *
             * @var Collection $enrollerVoteList
             */
            $enrollerVoteList = $enrollerList->groupBy('enroller_id')->map(function ($item) {
                return $item->sum('amount');
            });

            $winnerId = $enrollerVoteList->sort()->keys()->pop();

            /**
             * Assign Winner
             */
            dispatch(new AssignVotingWinnerToCrewJob(
                $expenditure->expenditurable, $winnerId
            ));
        }

        /**
         * Announce EnrollVotingHasFinished
         */
        event(new EnrollVotingHasFinished(
            $fund->getAttribute('project'), $fund, $this->vote
        ));
    }
}
