<?php

namespace DreamsArk\Events\Project\Stages;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Stages\Distribution;
use Illuminate\Queue\SerializesModels;

class DistributionWasCreated extends Event
{
    use SerializesModels;
    /**
     * @var Distribution
     */
    public $distribution;
    public $model;

    /**
     * Create a new event instance.
     *
     * @param Distribution $distribution
     */
    public function __construct(Distribution $distribution)
    {
        $this->distribution = $distribution;
        $this->model = $distribution;
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
