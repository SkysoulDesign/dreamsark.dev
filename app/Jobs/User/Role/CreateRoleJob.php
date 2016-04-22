<?php

namespace DreamsArk\Jobs\User\Role;

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
     * @var null|string
     */
    private $display_name;

    /**
     * @var null|string
     */
    private $description;

    /**
     * Create a new command instance.
     *
     * @param array|string $data
     */
    public function __construct($data)
    {

        list($name, $display_name, $description) = is_array($data) ? array_flatten($data) : func_get_args();

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
        return $repository->create($this->name, $this->display_name, $this->description);
    }

}
