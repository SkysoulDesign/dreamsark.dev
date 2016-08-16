<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ProjectStageWasCreated
 *
 * @package DreamsArk\Events\Project
 */
class ProjectStageWasCreated extends Event
{
    /**
     * @var Model
     */
    public $stage;

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
     * @param Model $stage
     * @param string $voting_date
     * @param $amount
     */
    public function __construct(Model $stage, string $voting_date, int $amount)
    {
        $this->stage = $stage;
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
