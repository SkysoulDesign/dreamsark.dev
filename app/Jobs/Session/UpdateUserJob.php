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
     * @var string
     */
    private $role;

    /**
     * Create a new job instance.
     *
     * @param User $user
     * @param array $fields
     * @param string $role
     */
    public function __construct(User $user, array $fields, $role = 'user')
    {
        $this->user = $user;
        $this->fields = $fields;
        $this->role = $role;
    }

    /**
     * Execute the job.
     *
     * @param UserRepositoryInterface $repository
     */
    public function handle(UserRepositoryInterface $repository)
    {
        $status = $repository->update($this->user->getAttribute('id'), $this->fields);

        if (!$status) {
            dd('user wasnt updated somehow');
        }

        /**
         * Announce UserWasUpdated
         */
        event(new UserWasUpdated($this->user));

    }

}
