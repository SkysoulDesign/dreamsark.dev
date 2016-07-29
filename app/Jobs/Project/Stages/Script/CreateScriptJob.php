<?php

namespace DreamsArk\Jobs\Project\Stages\Script;

use DreamsArk\Events\Project\Script\ScriptWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Jobs\Project\Stages\Traits\UpdateProjectStageReward;
use DreamsArk\Models\Project\Project;
use DreamsArk\Repositories\Project\Script\ScriptRepositoryInterface;

/**
 * Class CreateScriptJob
 *
 * @package DreamsArk\Jobs\Project\Stages\Script
 */
class CreateScriptJob extends Job
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
     * @param ScriptRepositoryInterface $repository
     * @param Project $project
     */
    public function handle(ScriptRepositoryInterface $repository, Project $project)
    {
        $this->initializeRewardValues();
        /**
         * Create Script
         */
        $script = $repository->create($this->project_id, $this->fields->except('reward')->toArray());
        /** Do Update / Insert record in ProjectReward with Amount for Stage */
        $this->updateReward($project, $script);

        $this->calculateChargeAmount();

        /**
         * Announce ScriptWasCreated
         */
        event(new ScriptWasCreated($script, $this->fields->get('voting_date'), $this->chargeUserAmount));

    }
}
