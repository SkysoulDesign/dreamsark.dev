<?php

namespace DreamsArk\Jobs\Session;

use DreamsArk\Events\Session\UserWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\Role;
use DreamsArk\Repositories\User\UserRepositoryInterface;

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
     * @param array $fields
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
     * @param UserRepositoryInterface $repository
     * @return \DreamsArk\Models\User\User
     */
    public function handle(UserRepositoryInterface $repository)
    {
        /**
         * Create User
         */
        $user = $repository->create($this->fields);

        /**
         * Announce UserWasCreated
         */
        event(new UserWasCreated($user, $this->role));

        return $user;

    }

}
