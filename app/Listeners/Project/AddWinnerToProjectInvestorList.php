<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Events\Project\Vote\VotingHasFinished;
use DreamsArk\Jobs\Project\CreateInvestorsJob;
use Illuminate\Foundation\Bus\DispatchesJobs;

/**
 * Class RegisterVotingWinner
 *
 * @package DreamsArk\Listeners\Project
 */
class AddWinnerToProjectInvestorList
{

    use DispatchesJobs;

    /**
     * Handle the event.
     *
     * @param VotingHasFinished $event
     */
    public function handle(VotingHasFinished $event)
    {
        /**
         * Register Winner
         */
        $this->dispatch(new CreateInvestorsJob(
            $event->submission
        ));
    }
}
