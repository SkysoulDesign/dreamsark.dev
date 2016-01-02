<?php

namespace DreamsArk\Commands\User\Project;

use DreamsArk\Commands\Command;
use DreamsArk\Commands\Project\CreateProjectCommand;
use DreamsArk\Commands\Project\Stages\Script\CreateScriptCommand;
use DreamsArk\Commands\Project\Stages\Synapse\CreateSynapseCommand;
use DreamsArk\Models\Project\Stages\Draft;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Foundation\Bus\DispatchesJobs;

class PublishProjectCommand extends Command implements SelfHandling
{

    use DispatchesJobs;

    /**
     * @var Draft
     */
    private $draft;

    /**
     * Create a new command instance.
     *
     * @param Draft $draft
     */
    public function __construct(Draft $draft)
    {
        $this->draft = $draft;
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
         * Check if Draft already have a project
         */
        if ($project = $this->draft->project) {

            /**
             * Create Next Stage
             */
            switch ($this->draft->type) {
                case 'synapse':
                    $this->dispatch(new CreateSynapseCommand($project->id, $this->draft->toArray()));
                    break;
                case 'script':
                    $this->dispatch(new CreateScriptCommand($project->id, $this->draft->toArray()));
                    break;
            }

        } else {

            /**
             * Create Project
             */
            $command = new CreateProjectCommand($this->draft->user, $this->draft->toArray());
            $this->dispatch($command);

        }

        /**
         * Delete Draft
         */
        $command = new DeleteDraftCommand($this->draft);
        $this->dispatch($command);

    }
}
