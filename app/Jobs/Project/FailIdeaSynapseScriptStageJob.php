<?php

namespace DreamsArk\Jobs\Project;

use DreamsArk\Events\Project\StageHasFailed;
use DreamsArk\Jobs\Job;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FailIdeaSynapseScriptStageJob
 *
 * @package DreamsArk\Jobs\Project
 */
class FailIdeaSynapseScriptStageJob extends Job
{
    /**
     * @var Model
     */
    private $model;

    /**
     * Create a new command instance.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Execute the command.
     *
     * @param Application $app
     */
    public function handle(Application $app)
    {

        /**
         * Initialize its repository and fail it
         */
        $app->make($this->model->repository)->fail($this->model->id);

        /**
         * Announce StageHasFailed
         */
        event(new StageHasFailed($this->model, $this->model->user, $this->model->reward->amount));

    }
}
