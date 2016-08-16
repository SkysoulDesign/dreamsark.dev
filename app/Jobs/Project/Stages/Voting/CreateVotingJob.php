<?php

namespace DreamsArk\Jobs\Project\Stages\Voting;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CreateVotingJob
 *
 * @package DreamsArk\Jobs\Project\Stages\Voting
 */
class CreateVotingJob extends Job
{
    /**
     * @var Project
     */
    private $model;

    /**
     * @var string
     */
    private $vote_open_date;

    /**
     * @var string
     */
    private $vote_close_date;

    /**
     * Create a new command instance.
     *
     * @param Model $model
     * @param string $vote_open_date
     * @param string $vote_close_date
     */
    public function __construct(Model $model, string $vote_open_date, string $vote_close_date)
    {
        $this->model = $model;
        $this->vote_open_date = $vote_open_date;
        $this->vote_close_date = $vote_close_date;
    }

    /**
     * Execute the command.
     */
    public function handle()
    {


    }
}
