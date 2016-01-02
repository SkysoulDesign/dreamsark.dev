<?php

namespace DreamsArk\Policies;

use DreamsArk\Models\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * @param User $user
     * @return bool
     */
    public function executeArtisanCommands(User $user)
    {
        return $user->hasRole('admin');
    }

    /**
     * @param User $user
     * @return bool
     */
    public function seeDashboard(User $user)
    {
        return $user->hasRole('committee', 'admin');
    }

    /**
     * @param User $user
     * @return bool
     */
    public function seeReports(User $user)
    {
        return $user->hasRole('admin');
    }

}
