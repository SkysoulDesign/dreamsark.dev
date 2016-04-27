<?php

namespace DreamsArk\Jobs\User\Project;

use DreamsArk\Events\User\Project\DraftWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Project\Draft\DraftRepositoryInterface;

/**
 * Class CreateDraftJob
 *
 * @package DreamsArk\Jobs\User\Project
 */
class CreateDraftJob extends Job
{

    /**
     * @var int|null
     */
    private $project_id;

    /**
     * @var array
     */
    private $fields;

    /**
     * @var User
     */
    private $user;

    /**
     * @var string
     */
    private $type;

    /**
     * Create a new command instance.
     *
     * @param $project_id
     * @param User $user
     * @param array $fields
     * @param string $type
     */
    public function __construct($project_id = null, User $user, array $fields, $type = "idea")
    {
        $this->user = $user;
        $this->fields = $fields;
        $this->type = $type;
        $this->project_id = $project_id;
    }

    /**
     * Execute the command.
     *
     * @param DraftRepositoryInterface $repository
     */
    public function handle(DraftRepositoryInterface $repository)
    {
        /**
         * Create Idea Draft
         */
        $draft = $repository->create($this->project_id, $this->user->id, $this->type, $this->fields);

        /**
         * Announce DraftWasCreated
         */
        event(new DraftWasCreated($draft));

    }
}
