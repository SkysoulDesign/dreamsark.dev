<?php

namespace DreamsArk\Repositories\User;

use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Repository;
use Illuminate\Support\Collection;

class UserRepository extends Repository implements UserRepositoryInterface
{

    /**
     * @var User
     */
    public $model;

    /**
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->model = $user;
    }

    /**
     * Returns all drafts for this user
     *
     * @param int $user_id
     * @return Collection
     */
    public function drafts($user_id)
    {
        return $this->model($user_id)->drafts;
    }

    /**
     * Returns all projects that this user has Published
     *
     * @param int $user_id
     * @return Collection
     */
    public function published($user_id)
    {
        return $this->model($user_id)->projects()
            ->whereHas('idea', function ($query) {
                $query->where('active', '=', true);
            })->orWhereHas('synapse', function ($query) {
                $query->where('active', '=', true);
            })->orWhereHas('script', function ($query) {
                $query->where('active', '=', true);
            })
            ->get();

    }

    /**
     * Returns all failed project for this user
     *
     * @param int $user_id
     * @return Collection
     */
    public function failed($user_id)
    {
        return $this->model($user_id)->projects()
            ->whereHas('idea', function ($query) {
                $query->where('active', '=', false);
            })->orWhereHas('synapse', function ($query) {
                $query->where('active', '=', false);
            })->orWhereHas('script', function ($query) {
                $query->where('active', '=', false);
            })
            ->get();

    }

    /**
     * Returns all Active project for this user
     *
     * @param int $user_id
     * @return Collection
     */
    public function active($user_id)
    {
        return $this->model($user_id)->projects()->active()->get();
    }

}