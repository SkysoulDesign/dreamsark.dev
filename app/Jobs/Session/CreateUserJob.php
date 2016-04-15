<?php

namespace DreamsArk\Jobs\Session;

use DreamsArk\Events\Session\UserWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Repositories\User\UserRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

/**
 * Class CreateUserJob
 * @package DreamsArk\Jobs\Session
 */
class CreateUserJob extends Job
{
    /**
     * @var array
     */
    private $fields;
    /**
     * @var string
     */
    private $role;
    /**
     * @var string
     */
    private $event_type;

    /**
     * Create a new job instance.
     *
     * @param array $fields
     * @param string $role
     * @param string $event_type
     */
    public function __construct(array $fields, $role = 'user', $event_type = 'user')
    {
        //
        $this->fields = $fields;
        $this->role = $role;
        $this->event_type = $event_type;
    }

    /**
     * Execute the job.
     *
     * @param UserRepositoryInterface $repository
     * @param Dispatcher $event
     */
    public function handle(UserRepositoryInterface $repository, Dispatcher $event)
    {
        /**
         * Create User
         */
        $user = $repository->create($this->fields);

        /**
         * Announce UserWasCreated
         */
        $event->fire(new UserWasCreated($user, $this->role, $this->event_type));
    }
}
