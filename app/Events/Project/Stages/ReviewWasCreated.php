<?php

namespace DreamsArk\Events\Project\Stages;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Stages\Review;
use Illuminate\Queue\SerializesModels;

class ReviewWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var Review
     */
    public $model;

    /**
     * Create a new event instance.
     *
     * @param Review $review
     */
    public function __construct(Review $review)
    {
        $this->model = $review;
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
