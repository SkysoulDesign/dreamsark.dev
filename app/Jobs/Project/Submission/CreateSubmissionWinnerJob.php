<?php

namespace DreamsArk\Jobs\Project\Submission;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Submission;

/**
 * Class CreateSubmissionWinnerJob
 *
 * @package DreamsArk\Jobs\Project\Submission
 */
class CreateSubmissionWinnerJob extends Job
{
    /**
     * @var Submission
     */
    private $submission;

    /**
     * Create a new command instance.
     *
     * @param Submission $submission
     */
    public function __construct(Submission $submission)
    {
        $this->submission = $submission;
    }

    /**
     * Execute the command.
     */
    public function handle()
    {

    }
}
