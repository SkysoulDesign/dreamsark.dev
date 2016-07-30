<?php

namespace DreamsArk\Jobs\Project\Stages;

use DreamsArk\Events\Project\ProjectStageWasUpdated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use Illuminate\Database\Eloquent\Model;

/**
 * Class UpdateProjectStageJob
 *
 * @package DreamsArk\Jobs\Project\Stages
 */
class UpdateProjectStageJob extends Job
{
    /**
     * @var Project
     */
    private $project;

    /**
     * @var Model
     */
    private $stage;

    /**
     * Create a new command instance.
     *
     * @param Project $project
     * @param $stage
     */
    public function __construct(Project $project, Model $stage)
    {
        $this->project = $project;
        $this->stage = $stage;
    }

    /**
     * Execute the command.
     */
    public function handle()
    {
        /**
         * Update Project Stage
         */
        $this->project->stage()->associate($this->stage)->save();

        /**
         * Announce ProjectStageWasUpdated
         */
        event(new ProjectStageWasUpdated(
            $this->project
        ));
    }
}
