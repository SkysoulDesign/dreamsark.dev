<?php

namespace DreamsArk\Listeners\User;

use DreamsArk\Events\Session\UserWasCreated;
use DreamsArk\Repositories\Bag\BagRepositoryInterface;

class GiveUserAnEmptyBag
{
    /**
     * @var BagRepositoryInterface
     */
    private $repository;

    /**
     * Create the event listener.
     *
     * @param BagRepositoryInterface $repository
     */
    public function __construct(BagRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Handle the event.
     *
     * @param  UserWasCreated $event
     * @return void
     */
    public function handle(UserWasCreated $event)
    {
        /**
         * Give the user an empty bag
         */
        $this->repository->attach([], $event->user->id);
    }
}
