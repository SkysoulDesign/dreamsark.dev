<?php

namespace DreamsArk\Commands\Bag;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Bag\UserWasRefunded;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Bag\BagRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class RefundUserCommand extends Command implements SelfHandling
{
    /**
     * @var int
     */
    private $amount;

    /**
     * @var User
     */
    private $user;

    /**
     * Create a new command instance.
     *
     * @param int $amount
     * @param User $user
     */
    public function __construct($amount, User $user)
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
         * Refund User
         */
        $repository->addCoins($this->user->bag->id, $this->amount);

        /**
         * Announce UserWasRefunded
         */
        $event->fire(new UserWasRefunded($this->user, $this->amount));
    }
}
