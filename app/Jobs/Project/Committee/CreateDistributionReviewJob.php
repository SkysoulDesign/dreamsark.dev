<?php

namespace DreamsArk\Jobs\Project\Committee;

use DreamsArk\Events\Project\Stages\DistributionWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Distribution;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CreateDistributionReviewJob extends Job
{
    use InteractsWithQueue, SerializesModels;
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
     */
    public function handle()
    {
        /**
         * Create Distribution Review for Project
         */
        $distribution = Distribution::create(['project_id' => $this->project->id]);

        event(new DistributionWasCreated($distribution));
    }
}
