<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Jobs\Project\Submission\CreateSubmissionWinnerJob;
use DreamsArk\Events\Project\Vote\VotingHasFinished;
use Illuminate\Foundation\Bus\DispatchesJobs;

/**
 * Class RegisterVotingWinner
 *
 * @package DreamsArk\Listeners\Project
 */
class RegisterVotingWinner
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
        $this->dispatch(new CreateSubmissionWinnerJob(
            $event->submission
        ));
    }
}
