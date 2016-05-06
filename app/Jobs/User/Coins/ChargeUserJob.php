<?php

namespace DreamsArk\Jobs\User\Coins;

use DreamsArk\Events\Bag\UserCoinsWasDeducted;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Bag\BagRepositoryInterface;

class ChargeUserJob extends Job
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
     */
    public function handle(BagRepositoryInterface $repository)
    {
        /**
         * Deduct User Coins
         */
        $repository->deductCoin($this->user->bag->id, $this->amount);

        /**
         * Announce UserCoinsWasDeducted
         */
        event(new UserCoinsWasDeducted($this->user, $this->amount));

    }
}
