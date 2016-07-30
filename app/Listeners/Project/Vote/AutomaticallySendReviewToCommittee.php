<?php

namespace DreamsArk\Listeners\Project\Vote;

use DreamsArk\Events\Project\Vote\VotingHasFinished;
use DreamsArk\Jobs\Project\Stages\Review\CreateReviewJob;
use DreamsArk\Models\Project\Stages\Script;
use Illuminate\Foundation\Bus\DispatchesJobs;

/**
 * Class AutomaticallySendReviewToCommittee
 *
 * @package DreamsArk\Listeners\Project\Vote
 */
class AutomaticallySendReviewToCommittee
{

    use DispatchesJobs;

    /**
     * Handle the event.
     *
     * @param  VotingHasFinished $event
     *
     * @return void
     */
    public function handle(VotingHasFinished $event)
    {

        $stage = $event->vote->getAttribute('votable');

        if ($stage instanceof Script) {
            $this->dispatch(
                new CreateReviewJob($stage->project)
            );
        }
    }
}
