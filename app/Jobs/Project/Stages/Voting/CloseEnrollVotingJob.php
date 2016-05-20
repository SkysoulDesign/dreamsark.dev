<?php

namespace DreamsArk\Jobs\Project\Stages\Voting;

use DreamsArk\Events\Project\Vote\EnrollVotingHasFinished;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Vote;
use Illuminate\Database\Eloquent\Collection;

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
        /** @var Fund $fund */
        $fund = $this->vote->votable;
        /** @var Project $project */
        $project = $fund->project;
        $project = $project->load('enrollable.enrollers.enrollvotes');

        if ($project->enrollVoteTotal() > 0) {
            foreach ($project->enrollable as $expenditureCrew) {
                /** to get enrollers' votes */
                /** @var Collection $enrollerList */
                $enrollerList = $expenditureCrew->enrollers->pluck('enrollvotes')->filter(function ($item) {
                    return !$item->isEmpty();
                })->flatten();
                /** to get enrollers' votes total */
                /** @var Collection $enrollerVoteList */
                $enrollerVoteList = $enrollerList->groupBy('enroller_id')->map(function ($item) {
                    return $item->sum('amount');
                });
                $winnerId = $enrollerVoteList->sort()->keys()->pop();
                dispatch(new AssignVotingWinnerToCrewJob($expenditureCrew->expenditurable_id, $winnerId));

            }

            event(new EnrollVotingHasFinished($project->id, $fund->id, $this->vote));
        }
    }
}
