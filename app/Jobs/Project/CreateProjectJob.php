<?php

namespace DreamsArk\Jobs\Project;

use DreamsArk\Events\User\Project\ProjectWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\User\User;

/**
 * Class CreateProjectJob
 *
 * @package DreamsArk\Commands\Project
 */
class CreateProjectJob extends Job
{
    /**
     * @var User
     */
    private $user;

    /**
     * @var array
     */
    private $fields;

    /**
     * @var int
     */
    private $reward;

    /**
     * @var string
     */
    private $stage;

    /**
     * CreateProjectJob constructor.
     *
     * @param User $user
     * @param array $fields
     * @param int $reward
     * @param string $stage
     */
    public function __construct(User $user, array $fields, int $reward, string $stage = 'idea')
    {
        $this->user = $user;
        $this->fields = $fields;
        $this->reward = $reward;
        $this->stage = $stage;
    }

    /**
     * Execute the command.
     *
     * @param Project $project
     * @return Project
     */
    public function handle(Project $project)
    {
        /**
         * Create Project
         */
        $project->user()->associate($this->user);
        $project
            ->fill($this->fields)
            ->save();

        /**
         * Announce ProjectWasCreated
         */
        event(new ProjectWasCreated(
            $project, $this->user, $this->fields, $this->reward, $this->stage
        ));

        return $project;
    }
}
