<?php

namespace DreamsArk\Listeners\User;

use DreamsArk\Events\Session\UserWasCreated;
use DreamsArk\Repositories\User\Role\RoleRepositoryInterface;

class AttachUserRole
{
    /**
     * @var RoleRepositoryInterface
     */
    private $repository;

    /**
     * Create the event listener.
     *
     * @param RoleRepositoryInterface $repository
     */
    public function __construct(RoleRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Handle the event.
     *
     * @param  UserWasCreated $event
     * @return void
     */
    public function handle(UserWasCreated $event)
    {
        $role_id = $event->role;

        if (is_string($event->role))
            $role_id = $this->repository->find($event->role)->id;

        /**
         * Attach Role To User
         */
        $this->repository->attach($event->user->id, $role_id);
    }
}
