<?php

namespace DreamsArk\Events\Project\Stages;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Distribution;
use Illuminate\Queue\SerializesModels;

/**
 * Class DistributionWasCreated
 *
 * @package DreamsArk\Events\Project\Stages
 */
class DistributionWasCreated extends Event
{

    use SerializesModels;

    /**
     * @var Distribution
     */
    public $distribution;

    /**
     * @var Distribution
     */
    public $stage;

    /**
     * @var Project
     */
    public $project;

    /**
     * Create a new event instance.
     *
     * @param Distribution $distribution
     */
    public function __construct(Distribution $distribution)
    {
        $this->distribution = $distribution;
        $this->stage = $distribution;
        $this->project = $distribution->getRelation('project');
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
