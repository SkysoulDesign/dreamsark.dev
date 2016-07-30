<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Jobs\Project\RefundUserJob;
use DreamsArk\Events\Event;
use Illuminate\Foundation\Bus\DispatchesJobs;

/**
 * Class RefundCreator
 *
 * @package DreamsArk\Listeners\Project
 */
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
        $this->dispatch(new RefundUserJob($event->amount, $event->user));
    }
}
