<?php

namespace DreamsArk\Jobs\Project\Stages\Synapse;

use DreamsArk\Events\Project\Synapse\SynapseWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Jobs\Project\Stages\Traits\UpdateProjectStageReward;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Synapse;
use DreamsArk\Repositories\Project\Synapse\SynapseRepositoryInterface;

/**
 * Class CreateSynapseJob
 *
 * @package DreamsArk\Jobs\Project\Stages\Synapse
 */
class CreateSynapseJob extends Job
{
    use UpdateProjectStageReward;

    /**
     * @var int
     */
    private $project_id;

    /**
     * @var array
     */
    private $fields;
    /**
     * @var
     */
    private $currentReward;
    /**
     * @var
     */
    private $newReward;
    /**
     * @var
     */
    private $chargeUserAmount;

    /**
     * Create a new command instance.
     *
     * @param int $project_id
     * @param array $fields
     */
    public function __construct($project_id, array $fields)
    {
        $this->project_id = $project_id;
        $this->fields = collect($fields);
    }

    /**
     * Execute the command.
     *
     * @param SynapseRepositoryInterface $repository
     * @param Project $project
     * @return Synapse
     */
    public function handle(SynapseRepositoryInterface $repository, Project $project)
    {
        $this->initializeRewardValues();
        /**
         * Create Synapse
         */
        $synapse = $repository->create($this->project_id, $this->fields->except('reward')->toArray());
        /** Do Update / Insert record in ProjectReward with Amount for Stage */
        $this->updateReward($project, $synapse);
        
        $this->calculateChargeAmount();

        /**
         * Announce SynapseWasCreated
         */
        event(new SynapseWasCreated($synapse, $this->fields->get('voting_date'), $this->chargeUserAmount));

    }
}
