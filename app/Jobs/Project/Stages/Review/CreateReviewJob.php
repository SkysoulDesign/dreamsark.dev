<?php

namespace DreamsArk\Jobs\Project\Stages\Review;

use DreamsArk\Events\Project\Stages\ReviewWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Repositories\Project\Review\ReviewRepositoryInterface;

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
     * @param ReviewRepositoryInterface $repository
     * @return \DreamsArk\Models\Project\Stages\Review
     */
    public function handle(ReviewRepositoryInterface $repository)
    {
        /**
         * Create Review
         */
        $review = $repository->create($this->project->id);

        /**
         * Announce ReviewWasCreated
         */
        event(new ReviewWasCreated($review));

        return $review;

    }
}
