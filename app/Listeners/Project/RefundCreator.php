<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Commands\Bag\RefundUserCommand;
use DreamsArk\Events\Event;
use Illuminate\Foundation\Bus\DispatchesJobs;

class RefundCreator
{

    use DispatchesJobs;

    /**
     * Handle the event.
     *
     * @param  Event $event
     * @return void
     */
    public function handle(Event $event)
    {
        /**
         * Refund Project Owner
         */
        $this->dispatch(new RefundUserCommand($event->amount, $event->user));
    }
}
