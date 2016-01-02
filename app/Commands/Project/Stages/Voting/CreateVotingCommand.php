<?php

namespace DreamsArk\Commands\Project\Stages\Voting;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Project\Vote\VoteWasCreated;
use DreamsArk\Models\Project\Project;
use DreamsArk\Repositories\Project\Vote\VoteRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Bus\DispatchesJobs;

class CreateVotingCommand extends Command implements SelfHandling
{

    use DispatchesJobs;

    /**
     * @var Project
     */
    private $model;

    /**
     * @var
     */
    private $vote_open_date;

    /**
     * @var
     */
    private $vote_close_date;

    /**
     * Create a new command instance.
     * @param Model $model
     * @param $vote_open_date
     * @param $vote_close_date
     */
    public function __construct(Model $model, $vote_open_date, $vote_close_date)
    {
        $this->model = $model;
        $this->vote_open_date = $vote_open_date;
        $this->vote_close_date = $vote_close_date;
    }

    /**
     * Execute the command.
     *
     * @param VoteRepositoryInterface $repository
     * @param Dispatcher $event
     */
    public function handle(VoteRepositoryInterface $repository, Dispatcher $event)
    {

        /**
         * Create Vote
         */
        $vote = $repository->create($this->model, $this->vote_open_date, $this->vote_close_date);

        /**
         * Announce VoteWasCreated
         */
        $event->fire(new VoteWasCreated($vote));

    }
}
