<?php

namespace DreamsArk\Jobs\Admin\User;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\User;

/**
 * Class DeleteUserJob
 *
 * @package DreamsArk\Jobs\Admin\User
 */
class DeleteUserJob extends Job
{
    /**
     * @var User
     */
    private $user;

    /**
     * Create a new job instance.
     *
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return User
     * @todo implement Repository
     */
    public function handle()
    {
        return $this->user->delete();
    }

}
