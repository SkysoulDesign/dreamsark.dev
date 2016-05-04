<?php

namespace DreamsArk\Jobs\Project\Expenditure;

use DreamsArk\Events\Project\ProjectWasBacked;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;

class BackProjectJob extends Job
{
    /**
     * @var Expenditure
     */
    private $project;

    /**
     * @var User
     */
    private $user;

    /**
     * @var
     */
    private $amount;

    /**
     * Create a new command instance.
     *
     * @param Project $project
     * @param User $user
     * @param $amount
     */
    public function __construct(Project $project, User $user, $amount)
    {
        $this->project = $project;
        $this->user = $user;
        $this->amount = $amount;
    }

    /**
     * Execute the command.
     *
     * @param ProjectRepositoryInterface $repository
     */
    public function handle(ProjectRepositoryInterface $repository)
    {
        /**
         * Back Expenditure
         */
        $repository->back($this->project->id, $this->user->id, $this->amount);

        /**
         * Announce ProjectWasBacked
         */
        event(new ProjectWasBacked($this->project, $this->user, $this->amount));
    }
}
