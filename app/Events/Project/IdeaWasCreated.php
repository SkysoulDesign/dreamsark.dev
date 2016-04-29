<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Stages\Idea;
use Illuminate\Queue\SerializesModels;

/**
 * Class IdeaWasCreated
 *
 * @package DreamsArk\Events\Project
 */
class IdeaWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var Idea
     */
    public $model;

    /**
     * @var string
     */
    public $voting_date;
    /**
     * @var
     */
    public $chargeAmount;

    /**
     * Create a new event instance.
     *
     * @param Idea $idea
     * @param string $voting_date
     * @param $chargeAmount
     */
    public function __construct(Idea $idea, $voting_date, $chargeAmount)
    {
        $this->model = $idea;
        $this->voting_date = $voting_date;
        $this->chargeAmount = $chargeAmount;
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
