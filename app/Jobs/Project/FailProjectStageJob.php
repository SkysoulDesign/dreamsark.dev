<?php

namespace DreamsArk\Jobs\Project;

use DreamsArk\Events\Project\StageHasFailed;
use DreamsArk\Jobs\Job;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FailIdeaSynapseScriptStageJob
 *
 * @package DreamsArk\Jobs\Project
 */
class FailProjectStageJob extends Job
{
    /**
     * @var Model
     */
    private $model;

    /**
     * @var int
     */
    private $reason;

    /**
     * Create a new command instance.
     *
     * @param Model $model
     * @param int $reason
     */
    public function __construct(Model $model, int $reason)
    {
        $this->model = $model;
        $this->reason = $reason;
    }

    /**
     * Execute the command.
     */
    public function handle()
    {

        $this->model
            ->setAttribute('active', false)
            ->setAttribute('fail_reason', $this->reason)
            ->save();

        /**
         * Announce StageHasFailed
         */
        event(new StageHasFailed(
            $this->model, $this->model->user, $this->model->reward->amount
        ));
    }
}
