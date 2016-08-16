<?php

namespace DreamsArk\Events;

use DreamsArk\Models\User\Role;

/**
 * Class RoleWasCreated
 *
 * @package DreamsArk\Events
 */
class RoleWasCreated
{
    /**
     * @var Role
     */
    public $role;

    /**
     * Create a new event instance.
     *
     * @param Role $role
     */
    public function __construct(Role $role)
    {
        $this->role = $role;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
