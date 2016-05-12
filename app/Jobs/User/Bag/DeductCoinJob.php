<?php

namespace DreamsArk\Jobs\User\Bag;

use DreamsArk\Jobs\Job;
use DreamsArk\Repositories\Bag\BagRepositoryInterface;

class DeductCoinJob extends Job
{
    /**
     * @var
     */
    private $amount;

    /**
     * @var
     */
    private $user_id;

    /**
     * Create a new command instance.
     *
     * @param $user_id
     * @param $amount
     */
    public function __construct($user_id, $amount)
    {
        $this->amount = $amount;
        $this->user_id = $user_id;
    }

    /**
     * Execute the command.
     *
     * @param BagRepositoryInterface $repository
     */
    public function handle(BagRepositoryInterface $repository)
    {
        $repository->deductCoin($this->user_id, $this->amount);
    }
}
