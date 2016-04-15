<?php

namespace DreamsArk\Models\Traits;

use DreamsArk\Models\User\Role;

/**
 * Class RolesAndPermissionTrait
 *
 * @package DreamsArk\Models\Traits
 */
trait RolesAndPermissionTrait
{
    /**
     * Role Relationship
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * Check if user has multiple roles
     *
     * @param array $roles
     * @return bool
     */
    public function hasRoles(array $roles)
    {

        $result = [];

        foreach ($roles as $role)
            array_push($result, $this->hasRole($role));

        return count($roles) === count(array_filter($result));

    }

    /**
     * Check if this model has a given role
     * Usage hasRole(user, admin) will be read like has role user or admin?
     *
     * @param string $name
     * @return bool
     */
    public function hasRole($name)
    {

        /**
         * if function has more than one argument then loop
         */
        if (func_num_args() > 1) {

            foreach (func_get_args() as $role)
                if ($this->hasRole($role)) return true;

            return false;

        }

        foreach ($this->roles as $role)
            if ($role->name == strtolower($name)) return true;

        return false;

    }

}