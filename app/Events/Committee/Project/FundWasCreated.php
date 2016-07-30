<?php

namespace DreamsArk\Events\Committee\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Review;
use Illuminate\Queue\SerializesModels;

/**
 * Class FundWasCreated
 *
 * @package DreamsArk\Events\Committee\Project
 */
class FundWasCreated extends Event
{

    use SerializesModels;

    /**
     * @var Review
     */
    public $stage;

    /**
     * @var Project
     */
    public $project;

    /**
     * @var string
     */
    public $voting_date;

    /**
     * Create a new event instance.
     *
     * @param Fund $fund
     * @param Project $project
     * @param string $voting_date
     */
    public function __construct(Fund $fund, Project $project, string $voting_date)
    {
        $this->stage = $fund;
        $this->project = $project;
        $this->voting_date = $voting_date;
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
