<?php

namespace DreamsArk\Jobs\Project\Stages\Synapse;

use DreamsArk\Events\Project\Synapse\SynapseWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Reward;
use DreamsArk\Models\Project\Stages\Synapse;

/**
 * Class CreateSynapseJob
 *
 * @package DreamsArk\Jobs\Project\Stages\Synapse
 */
class CreateSynapseJob extends Job
{
    /**
     * @var Project
     */
    private $project;

    /**
     * @var array
     */
    private $fields;

    /**
     * @var int
     */
    private $reward;

    /**
     * Create a new command instance.
     *
     * @param Project $project
     * @param array $fields
     * @param int $reward
     */
    public function __construct(Project $project, array $fields, int $reward)
    {
        $this->project = $project;
        $this->fields = $fields;
        $this->reward = $reward;
    }

    /**
     * Execute the command.
     *
     * @param \DreamsArk\Models\Project\Stages\Synapse $synapse
     *
     * @return \DreamsArk\Models\Project\Stages\Synapse
     */
    public function handle(Synapse $synapse) : Synapse
    {
        /**
         * Create Synapse
         */
        $synapse
            ->setAttribute('project_id', $this->project->getAttributeValue('id'))
            ->fill(
                array_except(
                    $this->fields, 'reward'
                )
            )->save();

        /**
         * Announce SynapseWasCreated
         */
        event(new SynapseWasCreated(
            $synapse, array_get($this->fields, 'voting_date'), array_get($this->fields, 'reward')
        ));

        return $synapse;

    }

}
