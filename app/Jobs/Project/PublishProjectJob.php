<?php

namespace DreamsArk\Jobs\Project;

use DreamsArk\Commands\User\Project\DeleteDraftCommand;
use DreamsArk\Jobs\Job;
use DreamsArk\Jobs\Project\Stages\Script\CreateScriptJob;
use DreamsArk\Jobs\Project\Stages\Synapse\CreateSynapseJob;
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
                    dispatch(new CreateSynapseJob($project->id, $this->draft->toArray()));
                    break;
                case 'script':
                    dispatch(new CreateScriptJob($project->id, $this->draft->toArray()));
                    break;
            }

        } else {

            /**
             * Create Project
             */
            $command = new CreateProjectJob($this->draft->user, $this->draft->toArray(), ['idea' => $this->draft->reward]);
            dispatch($command);

        }

        /**
         * Delete Draft
         */
        $command = new DeleteDraftCommand($this->draft);
        dispatch($command);

    }
}
