<?php

namespace DreamsArk\Jobs\Project\Stages\Synapse;

use DreamsArk\Events\Project\Synapse\SynapseWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Jobs\Project\Stages\Traits\UpdateProjectStageReward;
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

    use UpdateProjectStageReward;

    /**
     * @var \DreamsArk\Models\Project\Project
     */
    private $project;

    /**
     * @var array
     */
    private $fields;

    /**
     * Create a new command instance.
     *
     * @param \DreamsArk\Models\Project\Project $project
     * @param array $fields
     */
    public function __construct(Project $project, array $fields)
    {
        $this->project = $project;
        $this->fields = $fields;
    }

    /**
     * Execute the command.
     *
     * @param \DreamsArk\Models\Project\Stages\Synapse $synapse
     * @param \DreamsArk\Models\Project\Reward $reward
     * @return \DreamsArk\Models\Project\Stages\Synapse
     */
    public function handle(Synapse $synapse, Reward $reward) : Synapse
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


        $synapse->reward()->create([
            'amount' => array_get($this->fields, 'reward'),
            'project_id' => $this->project->getAttribute('id')
        ]);

//        $synapse->rewards()->create(
//            array_merge(['project_id' => $project->id, 'rewardable_type' => get_class($model)], $dataArr)
//        );

        /** Do Update / Insert record in ProjectReward with Amount for Stage */
//        $this->updateReward($this->project, $synapse);

//        $this->calculateChargeAmount();

        /**
         * Announce SynapseWasCreated
         */
        event(new SynapseWasCreated(
            $synapse, array_get($this->fields, 'voting_date'), array_get($this->fields, 'reward')
        ));

        return $synapse;

    }

}
