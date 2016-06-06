<?php

namespace DreamsArk\Repositories\User;

use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Repository;
use Illuminate\Support\Collection;

/**
 * Class UserRepository
 *
 * @package DreamsArk\Repositories\User
 */
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

    /**
     * @param $user_id
     * @return mixed
     */
    public function projectEarnings($user_id)
    {
        return $this->model($user_id)->submissions->load(['submissible', 'votes'])->filter(function ($item) {
            if ($item->id == $item->submissible->submission_id)
                return $item;

            return false;
        });
    }

    public function transactionList($user_id, $trans_status = '')
    {
        if ($trans_status == 'failed') {
            $result = $this->model($user_id)->transactions()->where('is_canceled', 1);
        } else {
            $active = ($trans_status == 'pending' ? false : true);
            $result = $this->model($user_id)->transactions()->where('is_payment_done', $active)->where('is_canceled', 0);
        }

        return $result->with('messages')->get();
    }

}