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
    public $chargeAmount;

    /**
     * Create a new event instance.
     *
     * @param Synapse $synapse
     * @param $voting_date
     * @param $chargeAmount
     */
    public function __construct(Synapse $synapse, $voting_date, $chargeAmount)
    {
        $this->model = $synapse;
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
