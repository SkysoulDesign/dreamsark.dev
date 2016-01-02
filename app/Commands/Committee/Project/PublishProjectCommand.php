<?php

namespace DreamsArk\Commands\Committee\Project;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Committee\Project\FundWasCreated;
use DreamsArk\Models\Project\Stages\Review;
use DreamsArk\Repositories\Project\Fund\FundRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class PublishProjectCommand extends Command implements SelfHandling
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
     * @param Dispatcher $event
     */
    public function handle(FundRepositoryInterface $repository, Dispatcher $event)
    {
        /**
         * Create Fund
         */
        $fund = $repository->create($this->review->project->id);

        /**
         * Announce FundWasCreated
         */
        $event->fire(new FundWasCreated($fund));
    }
}
