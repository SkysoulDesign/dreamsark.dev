<?php

namespace DreamsArk\Jobs\User\Coins;

use DreamsArk\Events\Bag\UserCoinsWasDeducted;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\User;

/**
 * Class ChargeUserJob
 *
 * @package DreamsArk\Jobs\User\Coins
 */
class ChargeUserJob extends Job
{
    /**
     * @var User
     */
    private $user;

    /**
     * @var int
     */
    private $amount;

    /**
     * Create a new command instance.
     *
     * @param User $user
     * @param int  $amount
     */
    public function __construct(User $user, int $amount)
    {
        $this->user = $user;
        $this->amount = $amount;

    }

    /**
     * Execute the command.
     */
    public function handle()
    {
        /**
         * Deduct User Coins
         */
        $this->user->bag()->decrement('coins', $this->amount);

        /**
         * Announce UserCoinsWasDeducted
         */
        event(new UserCoinsWasDeducted($this->user, $this->amount));
    }
}
