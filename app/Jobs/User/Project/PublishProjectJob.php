<?php

namespace DreamsArk\Jobs\User\Project;

use DreamsArk\Commands\Project\Stages\Script\CreateScriptCommand;
use DreamsArk\Commands\Project\Stages\Synapse\CreateSynapseCommand;
use DreamsArk\Commands\User\Project\DeleteDraftCommand;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Stages\Draft;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;

/**
 * Class PublishProjectJob
 *
 * @package DreamsArk\Jobs\User\Project
 */
class PublishProjectJob extends Job
{


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
     */
    public function handle(ProjectRepositoryInterface $repository)
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
                    dispatch(new CreateSynapseCommand($project->id, $this->draft->toArray()));
                    break;
                case 'script':
                    dispatch(new CreateScriptCommand($project->id, $this->draft->toArray()));
                    break;
            }

        } else {

            /**
             * Create Project
             */
            $command = new CreateProjectJob($this->draft->user, $this->draft->toArray());
            dispatch($command);

        }

        /**
         * Delete Draft
         */
        $command = new DeleteDraftCommand($this->draft);
        dispatch($command);

    }
}
