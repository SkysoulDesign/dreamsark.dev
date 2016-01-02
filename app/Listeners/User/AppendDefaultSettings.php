<?php

namespace DreamsArk\Listeners\User;

use DreamsArk\Events\Session\UserWasCreated;
use DreamsArk\Repositories\Setting\SettingRepositoryInterface;

class AppendDefaultSettings
{
    /**
     * @var SettingRepositoryInterface
     */
    private $repository;

    /**
     * Create the event listener.
     *
     * @param SettingRepositoryInterface $repository
     */
    public function __construct(SettingRepositoryInterface $repository)
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
         * Assign Default Settings
         */
        $this->repository->createDefault($event->user->id);
    }
}
