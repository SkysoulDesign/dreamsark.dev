<?php

namespace DreamsArk\Repositories\User\Role;

use DreamsArk\Models\User\Role;
use DreamsArk\Repositories\Traits\RepositoryHelperTrait;

class RoleRepository implements RoleRepositoryInterface
{

    use \DreamsArk\Repositories\Traits\RepositoryHelperTrait;

    /**
     * @var Role
     */
    public $model;

    /**
     * @param Role $user
     */
    public function __construct(Role $user)
    {
        $this->model = $user;
    }

    /**
     * Find Role on the database by name
     *
     * @param string $name
     * @return Role
     */
    public function find($name)
    {
        return $this->model->where(compact('name'))->firstOrFail();
    }

    /**
     * Create a new Role
     *
     * @param string $name
     * @param null|string $display_name
     * @param null|string $description
     * @return Role
     */
    public function create($name, $display_name = null, $description = null)
    {
        return $this->model->create(compact('name', 'display_name', 'description'));
    }

    /**
     * Attach user to Role
     *
     * @param $user_id
     * @param $role_id
     * @return Role
     */
    public function attach($user_id, $role_id)
    {
        return $this->model($role_id)->users()->attach(compact('user_id'));
    }

}