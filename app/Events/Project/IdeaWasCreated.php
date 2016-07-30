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
     * @var int
     */
    public $amount;

    /**
     * Create a new event instance.
     *
     * @param Idea $idea
     * @param string $voting_date
     * @param $amount
     */
    public function __construct(Idea $idea, string $voting_date, int $amount)
    {
        $this->model = $idea;
        $this->voting_date = $voting_date;
        $this->amount = $amount;
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
