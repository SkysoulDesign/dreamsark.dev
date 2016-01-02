<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Commands\Project\UpdateProjectStageCommand;
use DreamsArk\Events\Event;
use Illuminate\Foundation\Bus\DispatchesJobs;

class UpdateProjectStage
{
    use DispatchesJobs;

    /**
     * Handle the event.
     *
     * @param  Event $event
     * @return void
     */
    public function handle(Event $event)
    {
        /**
         * @todo the update command is generating a new instance and the old type is being sent down the line
         *       maybe if some function use $project->stage will get wrong stage
         * If project exists then update it to the next stage
         */
        $this->dispatch(new UpdateProjectStageCommand($event->model->project, $event->model));

    }
}
