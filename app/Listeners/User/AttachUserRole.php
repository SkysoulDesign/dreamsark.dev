<?php

namespace DreamsArk\Listeners\User;

use DreamsArk\Events\Session\UserWasCreated;
use DreamsArk\Repositories\User\Role\RoleRepositoryInterface;

/**
 * Class AttachUserRole
 *
 * @package DreamsArk\Listeners\User
 */
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

        /**
         * if role is string fetch it as a Model
         */
        if (is_string($event->role))
            $event->role = $this->repository->find($event->role);

        /**
         * Attach Role To User
         */
        $this->repository->attach($event->user->getAuthIdentifier(), $event->role);

    }

}
