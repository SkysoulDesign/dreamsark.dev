<?php

namespace DreamsArk\Jobs\Project\Stages;

use DreamsArk\Events\Project\ProjectStageWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Reward;
use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\Project\Stages\Script;
use DreamsArk\Models\Project\Stages\Synapse;

/**
 * Class CreateProjectStageJob
 *
 * @package DreamsArk\Jobs\Project\Stages
 */
class CreateProjectStageJob extends Job
{
    /**
     * @var Project
     */
    private $project;

    /**
     * @var string
     */
    private $stage;

    /**
     * @var array
     */
    private $fields;

    /**
     * @var int
     */
    private $amount;

    /**
     * @var array
     */
    private $stages = [
        'idea' => Idea::class,
        'synapse' => Synapse::class,
        'script' => Script::class
    ];

    /**
     * Create a new job instance.
     *
     * @param Project $project
     * @param string $stage
     * @param array $fields
     * @param int $amount
     */
    public function __construct(Project $project, string $stage, array $fields, int $amount)
    {
        $this->project = $project;
        $this->stage = $stage;
        $this->fields = $fields;
        $this->amount = $amount;
    }

    /**
     * Execute the job.
     *
     * @return Reward
     */
    public function handle()
    {
        /**
         * Create the project Stage
         */
        $stage = new $this->stages[$this->stage];
        $stage->project()->associate($this->project);
        $stage->fill($this->fields);
        $stage->save();

        $this->project->stage()->associate($stage);
        $this->project->save();

        /**
         * Announce $events
         */
        event(new ProjectStageWasCreated(
            $stage, array_get($this->fields, 'voting_date'), $this->amount
        ));
    }
}
