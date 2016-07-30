<?php

namespace DreamsArk\Listeners\Project\Vote;

use DreamsArk\Events\Event;

/**
 * Class DeactivateVoting
 *
 * @package DreamsArk\Listeners\Project\Vote
 */
class DeactivateVoting
{
    /**
     * Handle the event.
     *
     * @param Event $event
     */
    public function handle(Event $event)
    {
        $event->vote->setAttribute('active', false)->save();
    }
}
