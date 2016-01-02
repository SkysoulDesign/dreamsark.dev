<?php

namespace DreamsArk\Models\Traits;

use DreamsArk\Models\User\Role;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

            foreach (func_get_args() as $role) {

                if ($this->hasRole($role)) {
                    return true;
                };

            }

            return false;

        }

        foreach ($this->roles as $role) {
            if ($role->name == $name) {
                return true;
            }
        }

        return false;

    }


}