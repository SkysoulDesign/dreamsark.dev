<?php

namespace DreamsArk\Events\Project;

use DreamsArk\Events\Event;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Queue\SerializesModels;

/**
 * Class ProjectStageWasCreated
 *
 * @package DreamsArk\Events\Project
 */
class ProjectStageWasCreated extends Event
{

    use SerializesModels;

    /**
     * @var Model
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
     * @param Model $model
     * @param string $voting_date
     * @param $amount
     */
    public function __construct(Model $model, string $voting_date, int $amount)
    {
        $this->model = $model;
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
