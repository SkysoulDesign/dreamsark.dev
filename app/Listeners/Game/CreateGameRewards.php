<?php

namespace DreamsArk\Listeners\Game;

use DreamsArk\Events\Event;
use DreamsArk\Jobs\Game\CreateGameRewardsJob;

/**
 * Class CreateGameRewards
 *
 * @package DreamsArk\Listeners\Game
 */
class CreateGameRewards
{

    /**
     * Handle the event.
     *
     * @param  Event $event
     * @return void
     */
    public function handle(Event $event)
    {
        dispatch(new CreateGameRewardsJob(
            $event->stage
        ));
    }
}
