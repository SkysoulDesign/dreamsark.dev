<?php

namespace DreamsArk\Jobs\Project\Committee\Review;

use DreamsArk\Events\Committee\Project\FundWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Review;

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
     * @var string
     */
    private $voting_date;

    /**
     * Create a new command instance.
     *
     * @param Review $review
     * @param string $voting_date
     */
    public function __construct(Review $review, string $voting_date)
    {
        $this->review = $review;
        $this->voting_date = $voting_date;
    }

    /**
     * Execute the command.
     *
     * @param \DreamsArk\Models\Project\Stages\Fund $fund
     */
    public function handle(Fund $fund)
    {

        $project = $this->review->getAttribute('project');

        /**
         * Confirm Reviewed stage
         * Active true means it has been reviewed
         */
        $this->review->setAttribute('active', true)->save();

        /**
         * Create Fund
         */
        $fund->project()->associate($project)->save();

        /**
         * Announce FundWasCreated
         */
        event(new FundWasCreated(
            $fund, $project, $this->voting_date
        ));
    }
}
