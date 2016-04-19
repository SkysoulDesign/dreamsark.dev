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
     * @var User
     */
    private $user;

    /**
     * @var array
     */
    private $fields;

    /**
     * Create a new job instance.
     *
     * @param User $user
     * @param array $fields
     */
    public function __construct(User $user, array $fields)
    {
        $this->user = $user;
        $this->fields = $fields;
    }

    /**
     * Execute the job.
     *
     * @param UserRepositoryInterface $repository
     * @return boolean
     */
    public function handle(UserRepositoryInterface $repository)
    {

        $status = $repository->update($this->user->getAuthIdentifier(), $this->fields);

        /**
         * Announce UserWasUpdated
         */
        event(new UserWasUpdated($this->user));

        return $status;

    }

}
