<?php

namespace DreamsArk\Listeners\Project\Game;

use DreamsArk\Events\Project\Vote\VotingHasFinished;

/**
 * Class GiveItemsToWinner
 *
 * @package DreamsArk\Listeners\Project\Game
 */
class GiveItemsToWinner
{
    /**
     * Handle the event.
     *
     * @param  VotingHasFinished $event
     * @return void
     */
    public function handle(VotingHasFinished $event)
    {
        $user = $event->submission->getAttribute('user');
        $user->items()->attach(
            $event->submission->getAttribute('submissible')->reward->items, ['quantity' => 1]
        );
    }
}
