<?php

namespace DreamsArk\Listeners\User;

use DreamsArk\Events\Session\UserWasCreated;
use Illuminate\Auth\AuthManager;

class LogUserIn
{
    /**
     * @var AuthManager
     */
    private $auth;

    /**
     * Create the event listener.
     *
     * @param AuthManager $auth
     */
    public function __construct(AuthManager $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle the event.
     *
     * @param UserWasCreated $event
     */
    public function handle(UserWasCreated $event)
    {
        $this->auth->login($event->user);
    }

}
