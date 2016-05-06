<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Events\Event;
use DreamsArk\Jobs\User\Coins\ChargeUserJob;
use Illuminate\Foundation\Bus\DispatchesJobs;

class ChargeUser
{

    use DispatchesJobs;

    /**
     * Handle the event.
     *
     * @param  $event
     * @return void
     */
    public function handle(Event $event)
    {
        /**
         * Deduct Coins from the user
         */
//        $this->dispatch(new ChargeUserJob($event->model->user, $event->model->reward));
        if ($event->reward > 0)
            $this->dispatch(new ChargeUserJob($event->user, $event->reward));
    }
}
