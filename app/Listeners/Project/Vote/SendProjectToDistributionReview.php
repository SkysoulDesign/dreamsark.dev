<?php

namespace DreamsArk\Listeners\Project\Vote;

use DreamsArk\Events\Project\Vote\EnrollVotingHasFinished;
use DreamsArk\Jobs\Project\Committee\CreateDistributionReviewJob;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Fund;

class SendProjectToDistributionReview
{
    /**
     * Handle the event.
     *
     * @param EnrollVotingHasFinished $event
     */
    public function handle(EnrollVotingHasFinished $event)
    {
        /** @var Project $project */
        $project = Project::find($event->projectId);
        if ($project->stage instanceof Fund) {
            $project->stage->setAttribute('active', 1)->save();
            dispatch(new CreateDistributionReviewJob($project));
        }
    }
}
