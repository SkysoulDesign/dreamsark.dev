<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Commands\Project\ChargeUserCommand;
use DreamsArk\Events\Event;
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
        $this->dispatch(new ChargeUserCommand($event->model->user, $event->model->reward));
    }
}
