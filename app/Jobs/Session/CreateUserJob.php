<?php

namespace DreamsArk\Jobs\Session;

use DreamsArk\Events\Session\UserWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\Role;
use DreamsArk\Models\User\User;

/**
 * Class CreateUserJob
 *
 * @package DreamsArk\Jobs\Session
 */
class CreateUserJob extends Job
{
    /**
     * @var array
     */
    private $fields;

    /**
     * @var Role|int|string
     */
    private $role;

    /**
     * Create a new job instance.
     *
     * @param array           $fields
     * @param Role|int|string $role
     */
    public function __construct(array $fields, $role = 'user')
    {
        $this->fields = $fields;
        $this->role = $role;
    }

    /**
     * Execute the job.
     *
     * @param \DreamsArk\Models\User\User $user
     *
     * @return \DreamsArk\Models\User\User
     */
    public function handle(User $user)
    {
        /**
         * Create User
         */
        $user = $user->create($this->fields);

        /**
         * Announce UserWasCreated
         */
        event(new UserWasCreated($user, $this->role));

        return $user;
    }
}
