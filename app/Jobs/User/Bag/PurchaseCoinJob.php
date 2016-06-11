<?php

namespace DreamsArk\Jobs\User\Bag;

use DreamsArk\Events\Bag\CoinWasPurchased;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Bag\BagRepositoryInterface;

/**
 * Class PurchaseCoinJob
 *
 * @package DreamsArk\Jobs\User\Bag
 */
class PurchaseCoinJob extends Job
{
    /**
     * @var User
     */
    private $user;

    /**
     * @var float
     */
    private $amount;

    /**
     * Create a new command instance.
     *
     * @param User $user
     * @param $amount
     */
    public function __construct(User $user, float $amount)
    {
        $this->user = $user;
        $this->amount = $amount;
    }

    /**
     * Execute the command.
     *
     * @param BagRepositoryInterface $repository
     */
    public function handle(BagRepositoryInterface $repository)
    {
        /**
         * Increment User Coins
         */
        $repository->addCoins($this->user->bag->id, $this->amount);

        /**
         * Announce CoinWasPurchased
         */
        event(new CoinWasPurchased($this->user, $this->amount));

    }
}
