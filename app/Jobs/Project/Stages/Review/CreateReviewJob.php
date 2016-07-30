<?php

namespace DreamsArk\Jobs\Project\Stages\Review;

use DreamsArk\Events\Project\Stages\ReviewWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Review;

/**
 * Class CreateReviewJob
 *
 * @package DreamsArk\Jobs\Project\Stages\Review
 */
class CreateReviewJob extends Job
{
    /**
     * @var Project
     */
    private $project;

    /**
     * Create a new command instance.
     *
     * @param Project $project
     */
    public function __construct(Project $project)
    {
        $this->project = $project;
    }

    /**
     * Execute the command.
     *
     * @param \DreamsArk\Models\Project\Stages\Review $review
     *
     * @return \DreamsArk\Models\Project\Stages\Review
     */
    public function handle(Review $review) : Review
    {
        /**
         * Create Review
         */
        $review->project()->associate($this->project);
        $review->save();

        /**
         * Announce ReviewWasCreated
         */
        event(new ReviewWasCreated($review, $this->project));

        return $review;
    }
}
