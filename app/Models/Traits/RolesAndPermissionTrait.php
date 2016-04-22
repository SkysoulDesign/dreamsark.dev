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


    /**
     * Check if user has multiple roles
     *
     * @param array $roles
     * @return bool
     */
    public function hasRoles($roles)
    {

        $result = [];

        foreach (func_get_args() as $role) {
            $function = "call_user_func" . (is_array($role) ? '_array' : null);
            array_push($result, $function([$this, 'hasRole'], $role));
        }

        return count(func_get_args()) === count(array_filter($result));

    }

    /**
     * Method to check User have profile with $name (Ex: actor)
     * @param $name
     * @return bool
     */
    public function hasProfile($name){
        /**
         * if function has more than one argument then loop
         */
        if (func_num_args() > 1) {
            foreach (func_get_args() as $profile)
                if ($this->hasProfile($profile)) return true;
            return false;
        }

        foreach ($this->profiles as $profile)
            if ($profile->name == strtolower($name)) return true;
        return false;
    }

}