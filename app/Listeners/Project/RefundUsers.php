<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Jobs\Project\RefundUserJob;
use DreamsArk\Events\Event;
use Illuminate\Foundation\Bus\DispatchesJobs;

/**
 * Class RefundUsers
 *
 * @package DreamsArk\Listeners\Project
 */
class RefundUsers
{

    use DispatchesJobs;

    /**
     * Handle the event.
     *
     * @param  Event $event
     *
     * @return void
     */
    public function handle(Event $event)
    {
        $event->submissions->pluck('votes', 'id')->map(function ($users) {
            $users->map(function ($user) {
                $this->dispatch(new RefundUserJob($user->pivot->amount, $user));
            });
        });
    }
}
