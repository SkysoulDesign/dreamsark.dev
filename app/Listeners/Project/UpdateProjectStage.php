<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Jobs\Project\Stages\UpdateProjectStageJob;
use DreamsArk\Events\Event;
use Illuminate\Foundation\Bus\DispatchesJobs;

/**
 * Class UpdateProjectStage
 *
 * @package DreamsArk\Listeners\Project
 */
class UpdateProjectStage
{

    use DispatchesJobs;

    /**
     * Handle the event.
     *
     * @param  Event $event
     */
    public function handle(Event $event)
    {
        $this->dispatch(
            new UpdateProjectStageJob($event->project, $event->stage)
        );
    }
}
