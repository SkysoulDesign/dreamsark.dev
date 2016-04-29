<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Events\Event;
use DreamsArk\Jobs\Project\Stages\UpdateRewardJob;

class UpdateRewardForStage
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Event  $event
     * @return void
     */
    public function handle(Event $event)
    {
        dispatch(new UpdateRewardJob($event->model->project, $event->model, $event->chargeAmount));
    }
}
