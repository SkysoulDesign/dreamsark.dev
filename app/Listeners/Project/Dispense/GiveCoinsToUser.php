<?php

namespace DreamsArk\Listeners\Project\Dispense;

use DreamsArk\Events\Project\Dispense\DispenseWasPaid;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

/**
 * Class GiveCoinsToUser
 *
 * @package DreamsArk\Listeners\Project\Dispense
 */
class GiveCoinsToUser
{

    /**
     * Handle the event.
     *
     * @param  DispenseWasPaid $event
     * @return void
     */
    public function handle(DispenseWasPaid $event)
    {
        /**
         * Add Coins to user
         */
        $event->user->bag->increment('coins', $event->amount);
    }
}
