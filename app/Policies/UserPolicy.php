<?php

namespace DreamsArk\Policies;

use DreamsArk\Models\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Create Profile
     *
     * @param User $user
     * @return bool
     */
    public function createProfile(User $user)
    {
        return $user->hasRole('admin');
    }

    /**
     * Update Profile
     *
     * @param User $user
     * @return bool
     */
    public function updateProfile(User $user)
    {
        return $user->hasRole('admin');
    }

    /**
     * Delete Profile
     *
     * @param User $user
     * @return bool
     */
    public function deleteProfile(User $user)
    {
        return $user->hasRole('admin');
    }

    /**
     * Create User
     *
     * @param User $user
     * @return bool
     */
    public function createUser(User $user)
    {
        return $user->hasRole('admin');
    }

    /**
     * Update User
     *
     * @param User $user
     * @return bool
     */
    public function updateUser(User $user)
    {
        return $user->hasRole('admin');
    }

    /**
     * Delete User
     *
     * @param User $user
     * @return bool
     */
    public function deleteUser(User $user)
    {
        return $user->hasRole('admin');
    }

    /**
     * Create Question
     *
     * @param User $user
     * @return bool
     */
    public function createQuestion(User $user)
    {
        return $user->hasRole('admin');
    }

    /**
     * Update Question
     *
     * @param User $user
     * @return bool
     */
    public function updateQuestion(User $user)
    {
        return $user->hasRole('admin');
    }

    /**
     * Delete Question
     *
     * @param User $user
     * @return bool
     */
    public function deleteQuestion(User $user)
    {
        return $user->hasRole('admin');
    }

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

    public function seeAdminSection(User $user)
    {
        return $user->hasRoles(['admin']);
    }

    public function seeCommitteeSection(User $user)
    {
        return $user->hasRoles(['admin', 'committee']);
    }


}
