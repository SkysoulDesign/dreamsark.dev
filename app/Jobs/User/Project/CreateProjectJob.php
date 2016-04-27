<?php

namespace DreamsArk\Jobs\User\Project;

use DreamsArk\Events\Project\ProjectWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;


/**
 * Class CreateProjectJob
 * @package DreamsArk\Commands\Project
 */
class CreateProjectJob extends Job
{


    /**
     * @var array
     */
    private $fields;

    /**
     * @var User
     */
    private $user;

    /**
     * CreateProjectJob constructor.
     * @param User $user
     * @param array $fields
     */
    public function __construct(User $user, array $fields)
    {
        $this->user = $user;
        $this->fields = collect($fields);
    }

    /**
     * Execute the command.
     *
     * @param ProjectRepositoryInterface $repository
     * @return Project
     */
    public function handle(ProjectRepositoryInterface $repository)
    {

        $type = 'idea';

        /**
         * Create Project
         */
        $project = $repository->create($this->user->id, $type, $this->fields->all());

        /**
         * Announce ProjectWasCreated
         */
        event(new ProjectWasCreated($this->user, $project, $this->fields));

    }
}
