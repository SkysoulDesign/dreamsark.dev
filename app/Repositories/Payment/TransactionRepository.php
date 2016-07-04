<?php

namespace DreamsArk\Repositories\Payment;

use DreamsArk\Models\Payment\Transaction;

/**
 * Class TransactionRepository
 *
 * @package DreamsArk\Repositories\Payment
 */
class TransactionRepository
{
    /**
     * @var Transaction
     */
    public $model;

    /**
     * TransactionRepository constructor.
     *
     * @param Transaction $transaction
     */
    public function __construct(Transaction $transaction)
    {
        $this->model = $transaction;
    }

    /**
     * @param string $method
     * @return mixed
     */
    public function purchases($method)
    {
        $method = $method ?: 'all';

        return $this->doPaginate($this->$method($this->model->where('type', 'pay')));
    }

    /**
     * @param string $method
     * @return mixed
     */
    public function withdrawals($method)
    {
        $method = $method ?: 'all';

        return $this->doPaginate($this->$method($this->model->where('type', 'withdraw')));
    }

    /**
     * @param $query
     * @return mixed
     */
    protected function doPaginate($query)
    {
        return $query->orderBy('updated_at', 'desc')->paginate(config('defaults.general.pagination.per_page'));
    }

    /**
     * @param $query
     * @return mixed
     */
    public function all($query)
    {
        return $query;
    }

    /**
     * @param $query
     * @return mixed
     */
    protected function active($query)
    {
        return $this->addActiveCond($query);
    }

    /**
     * @param $query
     * @return mixed
     */
    protected function pending($query)
    {
        return $this->addActiveCond($query, false);
    }

    /**
     * @param $query
     * @return mixed
     */
    protected function canceled($query)
    {
        return $this->addCancelCond($query, true);
    }

    /**
     * @param $query
     * @param bool $active
     * @return mixed
     */
    protected function addActiveCond($query, $active = true)
    {
        return $this->addCancelCond($query->where('paid', $active));
    }

    /**
     * @param $query
     * @param bool $active
     * @return mixed
     */
    protected function addCancelCond($query, $active = false)
    {
        return $query->where('is_canceled', $active);
    }
}