<?php

namespace DreamsArk\Commands\Project\Submission;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Project\Submission\SubmissionWasSent;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class SubmitCommand extends Command implements SelfHandling
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
     * @param Dispatcher $event
     */
    public function handle(ProjectRepositoryInterface $repository, Dispatcher $event)
    {

        /**
         * Submit To Project Stage
         */
        $submission = $repository->submit($this->project->stage, $this->user->id, $this->fields);

        /**
         * Announce Submission was Sent
         */
        $event->fire(new SubmissionWasSent($submission));

    }
}
