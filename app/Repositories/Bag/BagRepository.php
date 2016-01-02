<?php

namespace DreamsArk\Repositories\Bag;

use DreamsArk\Models\User\Bag;
use DreamsArk\Repositories\Repository;

class BagRepository extends Repository implements BagRepositoryInterface
{

    /**
     * @var Bag
     */
    public $model;

    /**
     * @param Bag $bag
     */
    function __construct(Bag $bag)
    {
        $this->model = $bag;
    }

    /**
     * Create a new entry on the Database
     *
     * @param array $fields
     * @param int $user_id
     * @return Bag
     */
    public function attach(array $fields, $user_id)
    {
        $this->model->fill($fields)->setAttribute('user_id', $user_id)->save();
        return $this->model;
    }

    /**
     * Increment user coins amount
     *
     * @param $bag_id
     * @param int $amount
     */
    public function addCoins($bag_id, $amount)
    {
        $this->model($bag_id)->increment('coins', $amount);
    }

    /**
     * Decrement user coins amount
     *
     * @param $bag_id
     * @param int $amount
     */
    public function deductCoin($bag_id, $amount)
    {
        $this->model($bag_id)->decrement('coins', $amount);
    }

}