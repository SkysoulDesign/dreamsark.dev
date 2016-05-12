<?php

namespace DreamsArk\Jobs\Project;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Expenditures\Enroller;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Project\Expenditure\ExpenditureRepositoryInterface;

class VoteOnEnrollablePositionJob extends Job
{
    /**
     * @var User
     */
    private $enroller;

    /**
     * @var User
     */
    private $user;

    /**
     * Create a new command instance.
     *
     * @param Enroller $enroller
     * @param User $user
     */
    public function __construct(Enroller $enroller, User $user)
    {
        $this->enroller = $enroller;
        $this->user = $user;
    }

    /**
     * Execute the command.
     *
     * @param ExpenditureRepositoryInterface $repository
     */
    public function handle(ExpenditureRepositoryInterface $repository)
    {
        /**
         *
         */
        $repository->vote($this->enroller->id, $this->user->id);
    }
}
