<?php

namespace DreamsArk\Jobs\User\Project;

use DreamsArk\Events\User\Project\DraftWasUpdated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Stages\Draft;
use DreamsArk\Models\User\User;

/**
 * Class UpdateDraftJob
 *
 * @package DreamsArk\Jobs\User\Project
 */
class UpdateDraftJob extends Job
{
    /**
     * @var Draft
     */
    private $draft;
    /**
     * @var User
     */
    private $user;
    /**
     * @var array
     */
    private $fields;
    /**
     * @var string
     */
    private $type;

    /**
     * Create a new job instance.
     *
     * @param Draft $draft
     * @param User $user
     * @param array $fields
     * @param string $type
     */
    public function __construct(Draft $draft, User $user, array $fields, $type = "idea")
    {
        $this->draft = $draft;
        $this->user = $user;
        $this->fields = $fields;
        $this->type = $type;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->draft->update($this->fields);
        $this->draft->fresh();
        event(new DraftWasUpdated($this->draft));

    }
}
