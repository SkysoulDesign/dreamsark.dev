<?php

namespace DreamsArk\Repositories\User;

use DreamsArk\Models\User\User;
use Illuminate\Support\Collection;

interface UserRepositoryInterface
{
    /**
     * Create a new User on the Database
     *
     * @param array $fields
     * @return User
     */
    public function create(array $fields);

    /**
     * Update a new User on the Database
     *
     * @param int $user_id
     * @param array $fields
     * @return User
     */
    public function update($user_id, array $fields);

    /**
     * Returns all drafts for this user
     *
     * @param int $user_id
     * @return Collection
     */
    public function drafts($user_id);
}