<?php

namespace DreamsArk\Commands\Project;

use DreamsArk\Commands\Command;
use DreamsArk\Models\Project\Expenditures\Enroller;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Project\Expenditure\ExpenditureRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class VoteOnEnrollablePositionCommand extends Command implements SelfHandling
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
     * @param Dispatcher $event
     */
    public function handle(ExpenditureRepositoryInterface $repository, Dispatcher $event)
    {
        /**
         *
         */
        $repository->vote($this->enroller->id, $this->user->id);
    }
}
