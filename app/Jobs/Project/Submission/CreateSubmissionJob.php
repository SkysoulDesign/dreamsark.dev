<?php

namespace DreamsArk\Jobs\Project\Submission;

use DreamsArk\Events\Project\Submission\SubmissionWasSent;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;

/**
 * Class CreateSubmissionJob
 *
 * @package DreamsArk\Jobs\Project\Submission
 */
class CreateSubmissionJob extends Job
{
    /**
     * @var array
     */
    private $fields;

    /**
     * @var Project
     */
    private $project;

    /**
     * @var User
     */
    private $user;

    /**
     * Create a new command instance.
     *
     * @param Project $project
     * @param User $user
     * @param array $fields
     */
    public function __construct(Project $project, User $user, array $fields)
    {
        $this->project = $project;
        $this->user = $user;
        $this->fields = $fields;
    }

    /**
     * Execute the command.
     *
     * @param ProjectRepositoryInterface $repository
     */
    public function handle(ProjectRepositoryInterface $repository)
    {
        /**
         * Submit To Project Stage
         */
        $submission = $repository->submit(
            $this->project->stage, $this->user->id, $this->fields
        );

        /**
         * Announce Submission was Sent
         */
        event(new SubmissionWasSent($submission));
    }
}
