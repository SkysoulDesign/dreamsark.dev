<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Events\Project\ProjectStageWasCreated;
use DreamsArk\Events\User\Project\ProjectWasCreated;
use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\Project\Stages\Script;
use DreamsArk\Models\Project\Stages\Synapse;

/**
 * Class CreateProjectStage
 *
 * @package DreamsArk\Listeners\Project
 */
class CreateProjectStage
{
    /**
     * @var array
     */
    private $stages = [
        'idea' => Idea::class,
        'synapse' => Synapse::class,
        'script' => Script::class
    ];

    /**
     * Handle the event.
     *
     * @param ProjectWasCreated $event
     */
    public function handle(ProjectWasCreated $event)
    {
        /**
         * Create the project Stage
         */
        $stage = new $this->stages[$event->stage];
        $stage->project()->associate($event->project);
        $stage->fill($event->fields);
        $stage->setAttribute('active', true);
        $stage->save();

        /**
         * Associate Project to stage
         */
        $event->project->stage()->associate($stage);
        $event->project->save();

        /**
         * Announce ProjectStageWasCreated
         */
        event(new ProjectStageWasCreated(
            $stage, $event->fields['voting_date'], $event->amount
        ));
    }
}
