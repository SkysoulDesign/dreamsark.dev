<?php

namespace DreamsArk\Commands\Project\Stages\Review;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Project\Stages\ReviewWasCreated;
use DreamsArk\Models\Project\Project;
use DreamsArk\Repositories\Project\Review\ReviewRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class CreateReviewCommand extends Command implements SelfHandling
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
     * @param Dispatcher $event
     */
    public function handle(ReviewRepositoryInterface $repository, Dispatcher $event)
    {
        /**
         * Create Review
         */
        $review = $repository->create($this->project->id);

        /**
         * Announce ReviewWasCreated
         */
        $event->fire(new ReviewWasCreated($review));

    }
}
