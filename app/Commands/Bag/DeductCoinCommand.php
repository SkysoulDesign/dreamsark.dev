<?php

namespace DreamsArk\Commands\Bag;

use DreamsArk\Commands\Command;
use DreamsArk\Repositories\Bag\BagRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;

class DeductCoinCommand extends Command implements SelfHandling
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
