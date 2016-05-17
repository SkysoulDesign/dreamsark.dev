<?php

namespace DreamsArk\Jobs\Project;

use DreamsArk\Events\Project\Fund\EnrollerReceivedVote;
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
     * @var
     */
    private $amount;

    /**
     * Create a new command instance.
     *
     * @param Enroller $enroller
     * @param User $user
     * @param $amount
     */
    public function __construct(Enroller $enroller, User $user, $amount)
    {
        $this->enroller = $enroller;
        $this->user = $user;
        $this->amount = $amount;
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
        $repository->vote($this->enroller->id, $this->user->id, $this->amount);

        event(new EnrollerReceivedVote($this->enroller, $this->user, $this->amount));

    }
}
