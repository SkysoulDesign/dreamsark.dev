<?php

namespace DreamsArk\Jobs\Session;

use DreamsArk\Events\Session\UserWasUpdated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\User\UserRepositoryInterface;

/**
 * Class UpdateUserJob
 *
 * @package DreamsArk\Jobs\Session
 */
class UpdateUserJob extends Job
{

    /**
     * @var User|int
     */
    private $user;

    /**
     * @var array
     */
    private $fields;

    /**
     * Create a new job instance.
     *
     * @param User|int $user
     * @param array $fields
     */
    public function __construct($user, array $fields)
    {
        $this->user = $user;
        $this->fields = $fields;
    }

    /**
     * Execute the job.
     *
     * @param \DreamsArk\Repositories\User\UserRepository|UserRepositoryInterface $repository
     * @return User
     */
    public function handle(UserRepositoryInterface $repository)
    {

        /**
         * Update User
         */
        $user = $repository->update($this->user->getAuthIdentifier(), $this->fields);

        /**
         * Announce UserWasUpdated
         */
        event(new UserWasUpdated($user));

        return $user;

    }

}
