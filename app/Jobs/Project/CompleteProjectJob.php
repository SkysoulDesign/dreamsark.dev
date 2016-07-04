<?php

namespace DreamsArk\Jobs\Project;

use DreamsArk\Events\Project\ProjectWasCompleted;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;

class CompleteProjectJob extends Job
{
    /**
     * @var Project
     */
    private $project;

    /**
     * Create a new job instance.
     *
     * @param Project $project
     */
    public function __construct(Project $project)
    {
        $this->project = $project;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->project->stage->setAttribute('active', true);
        $this->project->stage->save();

        /**
         * @todo: need to create logic to distribute coins to crew, investors
         */

        event(new ProjectWasCompleted($this->project->fresh()));
    }
}
