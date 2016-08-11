<?php

namespace DreamsArk\Jobs\Project\Committee;

use DreamsArk\Events\Project\Stages\DistributionWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Distribution;

/**
 * Class CreateDistributionReviewJob
 *
 * @package DreamsArk\Jobs\Project\Committee
 */
class CreateDistributionReviewJob extends Job
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
     * @param Distribution $distribution
     */
    public function handle(Distribution $distribution)
    {
        /**
         * Create Distribution Review for Project
         */
        $distribution->project()->associate($this->project);
        $distribution->save();

        /**
         * Announce DistributionWasCreated
         */
        event(new DistributionWasCreated($distribution));
    }
}
