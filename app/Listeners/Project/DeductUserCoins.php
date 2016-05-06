<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Events\Event;
use DreamsArk\Jobs\User\Coins\ChargeUserJob;
use Illuminate\Foundation\Bus\DispatchesJobs;

class DeductUserCoins
{

    use DispatchesJobs;

    /**
     * Handle the event.
     *
     * @param $event
     */
    public function handle(Event $event)
    {
        /**
         * Deduct Coins from the user
         */
        $this->dispatch(new ChargeUserJob($event->user, $event->amount));
    }
}
