<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Events\Project\ProjectWasCreated;
use DreamsArk\Jobs\Project\Stages\CreateProjectStageJob;
use Illuminate\Foundation\Bus\DispatchesJobs;

/**
 * Class CreateProjectStage
 *
 * @package DreamsArk\Listeners\Project
 */
class CreateProjectStage
{

    use DispatchesJobs;

    /**
     * Handle the event.
     *
     * @param ProjectWasCreated $event
     */
    public function handle(ProjectWasCreated $event)
    {
        $this->dispatch(
            new CreateProjectStageJob(
                $event->project, $event->stage, $event->fields, $event->amount
            )
        );
    }
}
