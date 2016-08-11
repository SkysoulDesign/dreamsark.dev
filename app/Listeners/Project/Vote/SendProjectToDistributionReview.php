<?php

namespace DreamsArk\Listeners\Project\Vote;

use DreamsArk\Events\Project\Vote\EnrollVotingHasFinished;
use DreamsArk\Jobs\Project\Committee\CreateDistributionReviewJob;

/**
 * Class SendProjectToDistributionReview
 *
 * @package DreamsArk\Listeners\Project\Vote
 */
class SendProjectToDistributionReview
{
    /**
     * Handle the event.
     *
     * @param EnrollVotingHasFinished $event
     */
    public function handle(EnrollVotingHasFinished $event)
    {
        /**
         * Active The stage
         */
        $event->fund->setAttribute('active', true)->save();

        /**
         * Create The next stage
         */
        dispatch(new CreateDistributionReviewJob(
            $event->project
        ));
    }
}
