<?php

namespace DreamsArk\Jobs\Project\Stages\Idea;

use DreamsArk\Events\Project\IdeaWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Idea;

/**
 * Class CreateIdeaJob
 *
 * @package DreamsArk\Jobs\Project\Stages\Idea
 */
class CreateIdeaJob extends Job
{
    /**
     * @var \DreamsArk\Models\Project\Project
     */
    private $project;

    /**
     * @var array
     */
    private $fields;

    /**
     * @var int
     */
    private $reward;

    /**
     * Create a new command instance.
     *
     * @param \DreamsArk\Models\Project\Project $project
     * @param array $fields
     * @param int $reward
     */
    public function __construct(Project $project, array $fields, int $reward)
    {
        $this->project = $project;
        $this->fields = $fields;
        $this->reward = $reward;
    }

    /**
     * Execute the command.
     *
     * @param \DreamsArk\Models\Project\Stages\Idea $idea
     *
     * @return \DreamsArk\Models\Project\Stages\Idea
     */
    public function handle(Idea $idea)
    {

        $idea->project()->associate($this->project);
        $idea->fill($this->fields);
        $idea->save();

        /**
         * Announce IdeaWasCreated
         */
        event(new IdeaWasCreated(
            $idea, array_get($this->fields, 'voting_date'), $this->reward
        ));
    }
}
