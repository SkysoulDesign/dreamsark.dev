<?php

namespace DreamsArk\Jobs\User\Role;

use DreamsArk\Events\RoleWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\Role;
use DreamsArk\Repositories\User\Role\RoleRepositoryInterface;

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
    private $display_name;

    /**
     * @var string|null
     */
    private $description;

    /**
     * Create a new command instance.
     *
     * @param string $name
     * @param string|null $display_name
     * @param string|null $description
     */
    public function __construct($name, $display_name = null, $description = null)
    {
        $this->name = $name;
        $this->display_name = $display_name;
        $this->description = $description;
    }

    /**
     * Execute the command.
     *
     * @param RoleRepositoryInterface $repository
     * @return Role
     */
    public function handle(RoleRepositoryInterface $repository)
    {
        /**
         * Create Role
         */
        $role = $repository->create($this->name, $this->display_name, $this->description);

        /**
         * Announce RoleWasCreated
         */
        event(new RoleWasCreated($role));

        return $role;

    }

}
