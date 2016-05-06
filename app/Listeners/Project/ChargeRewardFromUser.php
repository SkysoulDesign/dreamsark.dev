<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Events\Project\ProjectWasCreated;
use DreamsArk\Jobs\User\Coins\ChargeUserJob;

class ChargeRewardFromUser
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  ProjectWasCreated $event
     * @return void
     */
    public function handle(ProjectWasCreated $event)
    {
        foreach ($event->rewards as $type => $amount) {
            if ((int)$amount > 0)
                dispatch(new ChargeUserJob($event->user, (int)$amount));
        }
    }
}
