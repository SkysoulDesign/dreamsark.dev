<?php

namespace DreamsArk\Commands\Project;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Project\ProjectStageWasUpdated;
use DreamsArk\Models\Project\Project;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\Eloquent\Model;

class UpdateProjectStageCommand extends Command implements SelfHandling
{
    /**
     * @var Project
     */
    private $project;

    /**
     * @var
     */
    private $stage;

    /**
     * Create a new command instance.
     *
     * @param Project $project
     * @param $stage
     */
    public function __construct(Project $project, Model $stage)
    {
        $this->project = $project;
        $this->stage = $stage;
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
         * Update Project Stage
         */
        $repository->nextStage($this->project->id, strtolower(class_basename($this->stage)));

        /**
         * Announce ProjectStageWasUpdated
         */
        $event->fire(new ProjectStageWasUpdated($this->project));
    }
}
