<?php

namespace DreamsArk\Listeners\User;

use DreamsArk\Events\Event;
use DreamsArk\Events\Session\UserWasCreated;
use DreamsArk\Events\Session\UserWasUpdated;
use DreamsArk\Models\User\Role;
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
     * @var Role
     */
    private $role;

    /**
     * Create the event listener.
     *
     * @param RoleRepositoryInterface $repository
     * @param Role $role
     */
    public function __construct(RoleRepositoryInterface $repository, Role $role)
    {
        $this->repository = $repository;
        $this->role = $role;
    }

    /**
     * Handle the event.
     *
     * @param UserWasCreated|UserWasUpdated|Event $event
     * @return void
     */
    public function handle(Event $event)
    {

        /**
         * if role is string or int fetch it as a Model
         */
        $role = $this->getRole($event);

        /**
         * Attach Role To User
         */
        $event->user->roles()->sync([$role->id]);

    }

    /**
     * @param UserWasCreated|UserWasUpdated|Event $event
     * @return Role
     */
    public function getRole(Event $event)
    {

        /**
         * If Instance of Role, Return it
         */
        if ($event->role instanceof Role)
            return $event->role;

        $field = (int)$event->role ? 'id' : 'name';

        return $this->role->where($field, $event->role)->firstOrFail();

    }

}
