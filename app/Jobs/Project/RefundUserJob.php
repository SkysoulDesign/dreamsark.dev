<?php

namespace DreamsArk\Jobs\Project;

use DreamsArk\Events\Bag\UserWasRefunded;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\User;

/**
 * Class RefundUserJob
 *
 * @package DreamsArk\Jobs\Project
 */
class RefundUserJob extends Job
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
    public function __construct(int $amount, User $user)
    {
        $this->amount = $amount;
        $this->user = $user;
    }

    /**
     * Execute the command.
     */
    public function handle()
    {
        /**
         * Refund User
         */
        $this->user->getAttribute('bag')->increment('coins', $this->amount);

        /**
         * Announce UserWasRefunded
         */
        event(new UserWasRefunded($this->user, $this->amount));
    }
}
