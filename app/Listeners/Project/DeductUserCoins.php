<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Commands\Project\ChargeUserCommand;
use DreamsArk\Events\Event;
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
        $this->dispatch(new ChargeUserCommand($event->user, $event->amount));
    }
}
