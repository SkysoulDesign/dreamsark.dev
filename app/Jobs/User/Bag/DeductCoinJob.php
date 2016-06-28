<?php

namespace DreamsArk\Jobs\User\Bag;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\User;
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
     */
    public function handle(BagRepositoryInterface $repository)
    {
        $repository->deductCoin($this->user->bag->id, $this->amount);
    }
}
