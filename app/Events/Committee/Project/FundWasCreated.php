<?php

namespace DreamsArk\Events\Committee\Project;

use Carbon\Carbon;
use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Review;
use Illuminate\Queue\SerializesModels;

class FundWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var Review
     */
    public $model;

    /**
     * @var Carbon|string
     */
    public $voting_date;

    /**
     * Create a new event instance.
     *
     * @param Fund $fund
     * @param null $voting_date
     */
    public function __construct(Fund $fund, $voting_date = null)
    {
        $this->model = $fund;
        $this->voting_date = $voting_date ?: $fund->created_at->addMinutes(500);
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
