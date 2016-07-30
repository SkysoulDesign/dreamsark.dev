<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Events\Event;
use DreamsArk\Jobs\Project\Stages\CreateRewardJob;
use Illuminate\Foundation\Bus\DispatchesJobs;

/**
 * Class CreateReward
 *
 * @package DreamsArk\Listeners\Project
 */
class CreateReward
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
        $this->dispatch(new CreateRewardJob(
            $event->model, $event->amount
        ));
    }
}
