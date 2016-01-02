<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Commands\Project\Stages\Idea\CreateIdeaCommand;
use DreamsArk\Commands\Project\Stages\Script\CreateScriptCommand;
use DreamsArk\Commands\Project\Stages\Synapse\CreateSynapseCommand;
use DreamsArk\Events\Project\ProjectWasCreated;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateProjectStage
{

    use DispatchesJobs;

    /**
     * Handle the event.
     * @param ProjectWasCreated $event
     */
    public function handle(ProjectWasCreated $event)
    {

        /**
         * Create Project Idea
         */
        if ($event->project->type == 'idea') {
            $this->dispatch(new CreateIdeaCommand($event->project->id, $event->fields->all()));
        }

        /**
         * Create Project Synapse
         */
        if ($event->project->type == 'synapse') {
            $this->dispatch(new CreateSynapseCommand($event->project->id, $event->fields->all()));
        }

        /**
         * Create Project Script
         */
        if ($event->project->type == 'script') {
            $this->dispatch(new CreateScriptCommand($event->project->id, $event->fields->all()));
        }

    }
}
