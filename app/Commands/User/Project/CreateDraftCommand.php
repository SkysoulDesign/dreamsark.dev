<?php

namespace DreamsArk\Commands\User\Project;

use DreamsArk\Commands\Command;
use DreamsArk\Events\User\Project\DraftWasCreated;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Project\Draft\DraftRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class CreateDraftCommand extends Command implements SelfHandling
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
     * @param Dispatcher $event
     */
    public function handle(DraftRepositoryInterface $repository, Dispatcher $event)
    {
        /**
         * Create Idea Draft
         */
        $draft = $repository->create($this->project_id, $this->user->id, $this->type, $this->fields);

        /**
         * Announce DraftWasCreated
         */
        $event->fire(new DraftWasCreated($draft));

    }
}
