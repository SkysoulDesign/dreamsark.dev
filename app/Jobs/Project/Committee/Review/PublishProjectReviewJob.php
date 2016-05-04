<?php

namespace DreamsArk\Jobs\Project\Committee\Review;

use DreamsArk\Events\Committee\Project\FundWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Stages\Review;
use DreamsArk\Repositories\Project\Fund\FundRepositoryInterface;

/**
 * Class PublishProjectReviewJob
 *
 * @package DreamsArk\Jobs\Project\Committee\Review
 */
class PublishProjectReviewJob extends Job
{
    /**
     * @var Review
     */
    private $review;

    /**
     * Create a new command instance.
     *
     * @param Review $review
     */
    public function __construct(Review $review)
    {
        $this->review = $review;
    }

    /**
     * Execute the command.
     *
     * @param FundRepositoryInterface $repository
     */
    public function handle(FundRepositoryInterface $repository)
    {
        $this->review->setAttribute('active', 1)->save();
        $this->review->fresh();
        /**
         * Create Fund
         */
        $fund = $repository->create($this->review->project->id);

        /**
         * Announce FundWasCreated
         */
        event(new FundWasCreated($fund));
    }
}
