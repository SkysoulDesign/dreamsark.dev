<?php

namespace DreamsArk\Jobs\Project;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Submission;

/**
 * Class CreateInvestorsJob
 *
 * @package DreamsArk\Jobs\Project
 */
class CreateInvestorsJob extends Job
{
    /**
     * @var \DreamsArk\Models\Project\Submission
     */
    private $submission;

    /**
     * Create a new job instance.
     *
     * @param Submission $submission
     */
    public function __construct(Submission $submission)
    {
        $this->submission = $submission;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

    }
}
