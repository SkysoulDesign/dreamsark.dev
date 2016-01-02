<?php

namespace DreamsArk\Repositories\User\Role;

interface RoleRepositoryInterface
{
    /**
     * Create a new Role
     *
     * @param string $name
     * @param null|string $display_name
     * @param null|string $description
     */
    public function create($name, $display_name = null, $description = null);
}