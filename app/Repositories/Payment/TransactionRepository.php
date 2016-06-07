<?php

namespace DreamsArk\Repositories\Payment;

use DreamsArk\Models\Payment\Transaction;

class TransactionRepository
{
    public $model;

    public function __construct(Transaction $transaction)
    {
        $this->model = $transaction;
    }

    public function purchases($method = 'active')
    {
        $method = $method ?: 'active';

        return $this->doPaginate($this->$method($this->model->where('type', 'pay')));
    }

    public function withdrawals($method = 'active')
    {
        $method = $method ?: 'active';

        return $this->doPaginate($this->$method($this->model->where('type', 'withdraw')));
    }

    protected function doPaginate($query)
    {
        return $query->orderBy('updated_at', 'desc')->paginate(config('defaults.general.pagination.per_page'));
    }

    protected function active($query)
    {
        return $this->addActiveCond($query);
    }

    protected function pending($query)
    {
        return $this->addActiveCond($query, false);
    }

    protected function canceled($query)
    {
        return $this->addCancelCond($query, true);
    }

    protected function addActiveCond($query, $active = true)
    {
        return $this->addCancelCond($query->where('is_payment_done', $active));
    }

    protected function addCancelCond($query, $active = false)
    {
        return $query->where('is_canceled', $active);
    }
}