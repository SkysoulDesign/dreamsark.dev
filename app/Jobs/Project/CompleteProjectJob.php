<?php

namespace DreamsArk\Jobs\Project;

use DreamsArk\Events\Project\ProjectWasCompleted;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;

/**
 * Class CompleteProjectJob
 *
 * @package DreamsArk\Jobs\Project
 */
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

        $stage = $this->project->getAttribute('distribution');
        $stage->setAttribute('active', true);
        $stage->save();

        /**
         * Project Was Complete
         */
        event(new ProjectWasCompleted(
            $this->project
        ));
    }
}
