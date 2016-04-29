<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Events\Project\ProjectWasCreated;
use DreamsArk\Jobs\Project\Stages\Idea\CreateIdeaJob;
use Illuminate\Foundation\Bus\DispatchesJobs;

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
            $this->dispatch(new CreateIdeaJob($event->project->id, $event->fields->all(), $event->rewards['idea']));
        }

        /**
         * Create Project Synapse
         */
        /*if ($event->project->type == 'synapse') {
            $this->dispatch(new CreateSynapseJob($event->project->id, $event->fields->all()));
        }*/

        /**
         * Create Project Script
         */
        /*if ($event->project->type == 'script') {
            $this->dispatch(new CreateScriptJob($event->project->id, $event->fields->all()));
        }*/

    }
}
