<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Events\Project\ProjectWasCreated;
use DreamsArk\Jobs\User\Coins\ChargeUserJob;

/**
 * Class ChargeRewardFromUser
 *
 * @package DreamsArk\Listeners\Project
 */
class ChargeRewardFromUser
{
    /**
     * Handle the event.
     *
     * @param  ProjectWasCreated $event
     *
     * @return void
     */
    public function handle(ProjectWasCreated $event)
    {
        foreach ($event->rewards as $type => $amount) {
            dispatch(
                new ChargeUserJob($event->user, (int)$amount)
            );
        }
    }
}
