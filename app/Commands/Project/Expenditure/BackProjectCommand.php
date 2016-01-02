<?php

namespace DreamsArk\Commands\Project\Expenditure;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Project\ProjectWasBacked;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class BackProjectCommand extends Command implements SelfHandling
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
     * @param Dispatcher $event
     */
    public function handle(ProjectRepositoryInterface $repository, Dispatcher $event)
    {
        /**
         * Back Expenditure
         */
        $repository->back($this->project->id, $this->user->id, $this->amount);

        /**
         * Announce ProjectWasBacked
         */
        $event->fire(new ProjectWasBacked($this->project, $this->user, $this->amount));
    }
}
