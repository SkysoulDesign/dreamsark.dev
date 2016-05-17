<?php

namespace DreamsArk\Jobs\Project\Stages\Voting;

use DreamsArk\Events\Project\Vote\VoteWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Repositories\Project\Vote\VoteRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class CreateVotingJob extends Job
{


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
     */
    public function handle(VoteRepositoryInterface $repository)
    {

        /**
         * Create Vote
         */
        $vote = $repository->create($this->model, $this->vote_open_date, $this->vote_close_date);

        /**
         * Announce VoteWasCreated
         */
        event(new VoteWasCreated($vote));

    }
}
