<?php

namespace DreamsArk\Events\Project\Stages;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Review;
use Illuminate\Queue\SerializesModels;

/**
 * Class ReviewWasCreated
 *
 * @package DreamsArk\Events\Project\Stages
 */
class ReviewWasCreated extends Event
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
     * Create a new event instance.
     *
     * @param Review $review
     * @param Project $project
     */
    public function __construct(Review $review, Project $project)
    {
        $this->stage = $review;
        $this->project = $project;
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
