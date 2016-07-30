<?php

namespace DreamsArk\Events\Project\Synapse;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Stages\Synapse;
use Illuminate\Queue\SerializesModels;

/**
 * Class SynapseWasCreated
 *
 * @package DreamsArk\Events\Project\Synapse
 */
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
     * @var
     */
    public $amount;

    /**
     * Create a new event instance.
     *
     * @param Synapse $synapse
     * @param $voting_date
     * @param $amount
     */
    public function __construct(Synapse $synapse, string $voting_date, int $amount)
    {
        $this->model = $synapse;
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
