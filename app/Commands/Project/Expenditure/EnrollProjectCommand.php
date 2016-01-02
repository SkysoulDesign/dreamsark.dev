<?php

namespace DreamsArk\Commands\Project\Expenditure;

use DreamsArk\Commands\Command;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Project\Expenditure\ExpenditureRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;

class EnrollProjectCommand extends Command implements SelfHandling
{
    /**
     * @var Expenditure
     */
    private $expenditure;

    /**
     * @var User
     */
    private $user;

    /**
     * Create a new command instance.
     *
     * @param Expenditure $expenditure
     * @param User $user
     */
    public function __construct(Expenditure $expenditure, User $user)
    {
        $this->expenditure = $expenditure;
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
         * Enroll into a Expenditure
         */
        $repository->enroll($this->expenditure->id, $this->user->id);
    }
}
