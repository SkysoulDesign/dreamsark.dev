<?php

namespace DreamsArk\Jobs\Session;

use DreamsArk\Events\Session\UserWasUpdated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\User\UserRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

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
        //
        $this->user = $user;
        $this->fields = $fields;
        $this->role = $role;
    }

    /**
     * Execute the job.
     *
     * @param UserRepositoryInterface $repository
     * @param Dispatcher $event
     */
    public function handle(UserRepositoryInterface $repository, Dispatcher $event)
    {
        $status = $repository->update($this->user->getAttribute('id'), $this->fields);

        if (!$status) {
            dd('user wasnt updated somehow');
        }

        $event->fire(new UserWasUpdated($this->user));
    }
}
