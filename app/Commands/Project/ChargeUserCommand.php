<?php

namespace DreamsArk\Commands\Project;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Bag\UserCoinsWasDeducted;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Bag\BagRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class ChargeUserCommand extends Command implements SelfHandling
{
    /**
     * @var
     */
    private $amount;

    /**
     * @var
     */
    private $user;

    /**
     * Create a new command instance.
     *
     * @param User $user
     * @param int $amount
     */
    public function __construct(User $user, $amount)
    {
        $this->user = $user;
        $this->amount = $amount;

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
         * Deduct User Coins
         */
        $repository->deductCoin($this->user->bag->id, $this->amount);

        /**
         * Announce UserCoinsWasDeducted
         */
        $event->fire(new UserCoinsWasDeducted($this->user, $this->amount));

    }
}
