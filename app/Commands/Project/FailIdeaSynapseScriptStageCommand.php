<?php

namespace DreamsArk\Commands\Project;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Project\StageHasFailed;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Database\Eloquent\Model;

class FailIdeaSynapseScriptStageCommand extends Command implements SelfHandling
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
     * @param Dispatcher $event
     * @param Application $app
     */
    public function handle(Dispatcher $event, Application $app)
    {

        /**
         * Initialize its repository and fail it
         */
        $app->make($this->model->repository)->fail($this->model->id);

        /**
         * Announce StageHasFailed
         */
        $event->fire(new StageHasFailed($this->model, $this->model->user, $this->model->reward));

    }
}
