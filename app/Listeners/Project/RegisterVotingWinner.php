<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Commands\Project\Submission\CreateSubmissionWinnerCommand;
use DreamsArk\Events\Project\Vote\VotingHasFinished;
use Illuminate\Foundation\Bus\DispatchesJobs;

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
        $this->dispatch(new CreateSubmissionWinnerCommand($event->submission));
    }
}
