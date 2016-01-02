<?php

namespace DreamsArk\Events\Project\Synapse;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Stages\Synapse;
use Illuminate\Queue\SerializesModels;

class SynapseWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var Synapse
     */
    public $model;

    /**
     * @var
     */
    public $voting_date;

    /**
     * Create a new event instance.
     *
     * @param Synapse $synapse
     * @param $voting_date
     */
    public function __construct(Synapse $synapse, $voting_date)
    {
        $this->model = $synapse;
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
