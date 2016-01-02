<?php

namespace DreamsArk\Commands\User\Role;

use DreamsArk\Commands\Command;
use DreamsArk\Repositories\User\Role\RoleRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;

class CreateRoleCommand extends Command implements SelfHandling
{
    /**
     * @var string
     */
    private $roleName;

    /**
     * @var null|string
     */
    private $display_name;

    /**
     * @var null|string
     */
    private $roleDescription;

    /**
     * Create a new command instance.
     *
     * @param string $roleName
     * @param null|string $display_name
     * @param null|string $roleDescription
     */
    public function __construct($roleName, $display_name = null, $roleDescription = null)
    {
        $this->roleName = $roleName;
        $this->display_name = $display_name;
        $this->roleDescription = $roleDescription;
    }

    /**
     * Execute the command.
     *
     * @param RoleRepositoryInterface $repository
     */
    public function handle(RoleRepositoryInterface $repository)
    {
        /**
         * Create Role
         */
        $repository->create($this->roleName, $this->display_name, $this->roleDescription);
    }
}
