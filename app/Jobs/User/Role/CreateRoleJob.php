<?php

namespace DreamsArk\Jobs\User\Role;

use DreamsArk\Events\RoleWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\Role;

/**
 * Class CreateRoleJob
 *
 * @package DreamsArk\Jobs\User\Role
 */
class CreateRoleJob extends Job
{
    /**
     * @var string
     */
    private $name;

    /**
     * @var string|null
     */
    private $description;

    /**
     * Create a new command instance.
     *
     * @param string $name
     * @param string|null $description
     */
    public function __construct($name, $description = null)
    {
        $this->name = $name;
        $this->description = $description;
    }

    /**
     * Execute the command.
     *
     * @param \DreamsArk\Models\User\Role $role
     * @return \DreamsArk\Models\User\Role
     */
    public function handle(Role $role)
    {
        /**
         * Create Role
         */
        $role = $role->create([
            'name' => $this->name,
            'description' => $this->description
        ]);

        /**
         * Announce RoleWasCreated
         */
        event(new RoleWasCreated($role));

        return $role;
    }
}
