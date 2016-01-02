<?php

namespace DreamsArk\Listeners\Project\Vote;

use DreamsArk\Commands\Project\Stages\Review\CreateReviewCommand;
use DreamsArk\Events\Project\Vote\VotingHasFinished;
use DreamsArk\Models\Project\Stages\Script;
use Illuminate\Foundation\Bus\DispatchesJobs;

class AutomaticallySendReviewToCommittee
{

    use DispatchesJobs;

    /**
     * Handle the event.
     *
     * @param  VotingHasFinished $event
     * @return void
     */
    public function handle(VotingHasFinished $event)
    {

        if ($event->vote->votable instanceof Script) {
            $this->dispatch(new CreateReviewCommand($event->vote->project));
        }
    }
}
