<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Commands\Bag\RefundUserCommand;
use DreamsArk\Events\Event;
use Illuminate\Foundation\Bus\DispatchesJobs;

class RefundUsers
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

        $event->users->pluck('votes', 'id')->map(function ($item) {
            $item->map(function ($user) {
                $this->dispatch(new RefundUserCommand($user->pivot->amount, $user));
            });
        });

    }
}
