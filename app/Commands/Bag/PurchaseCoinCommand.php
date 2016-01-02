<?php

namespace DreamsArk\Commands\Bag;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Bag\CoinWasPurchased;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Bag\BagRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class PurchaseCoinCommand extends Command implements SelfHandling
{
    /**
     * @var
     */
    private $amount;

    /**
     * @var User
     */
    private $user;

    /**
     * Create a new command instance.
     *
     * @param User $user
     * @param $amount
     */
    public function __construct(User $user, $amount)
    {
        $this->amount = $amount;
        $this->user = $user;
    }

    /**
     * Execute the command.
     *
     * @param BagRepositoryInterface $repository
     * @param Dispatcher $event
     */
    public function handle(BagRepositoryInterface $repository, Dispatcher $event)
    {
        /**
         * Increment User Coins
         */
        $repository->addCoins($this->user->bag->id, $this->amount);

        /**
         * Announce CoinWasPurchased
         */
        $event->fire(new CoinWasPurchased($this->user, $this->amount));

    }
}
