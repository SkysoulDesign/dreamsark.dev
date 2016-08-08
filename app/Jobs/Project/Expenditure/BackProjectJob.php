<?php

namespace DreamsArk\Jobs\Project\Expenditure;

use DreamsArk\Events\Project\ProjectWasBacked;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\User\User;

/**
 * Class BackProjectJob
 *
 * @package DreamsArk\Jobs\Project\Expenditure
 */
class BackProjectJob extends Job
{
    /**
     * @var Project
     */
    private $project;

    /**
     * @var User
     */
    private $user;

    /**
     * @var int
     */
    private $amount;

    /**
     * Create a new command instance.
     *
     * @param Project $project
     * @param User $user
     * @param $amount
     */
    public function __construct(Project $project, User $user, int $amount)
    {
        $this->project = $project;
        $this->user = $user;
        $this->amount = $amount;
    }

    /**
     * Execute the command.
     */
    public function handle()
    {

        $this->project->investors()->attach(
            $this->user, ['amount' => $this->amount]
        );

        /**
         * Announce ProjectWasBacked
         */
        event(new ProjectWasBacked(
            $this->project, $this->user, $this->amount
        ));
    }
}
