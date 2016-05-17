<?php

namespace DreamsArk\Listeners\Project\Vote;

use DreamsArk\Events\Project\Vote\VotingHasFinished;
use DreamsArk\Jobs\Project\Stages\Review\CreateReviewJob;
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
            $this->dispatch(new CreateReviewJob($event->vote->project));
        }
    }
}
