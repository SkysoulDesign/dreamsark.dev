<?php

namespace DreamsArk\Jobs\Project\Submission;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Submission;

/**
 * Class UpdateSubmissionJob
 *
 * @package DreamsArk\Jobs\Project\Submission
 */
class UpdateSubmissionJob extends Job
{
    /**
     * @var \DreamsArk\Models\Project\Submission
     */
    private $submission;

    /**
     * @var array
     */
    private $fields;

    /**
     * Create a new command instance.
     *
     * @param \DreamsArk\Models\Project\Submission $submission
     * @param array $fields
     */
    public function __construct(Submission $submission, array $fields)
    {
        $this->submission = $submission;
        $this->fields = $fields;
    }

    /**
     * Execute the command.
     */
    public function handle()
    {
        $this->submission->update(
            $this->fields
        );
    }
}
