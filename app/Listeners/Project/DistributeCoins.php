<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Events\Project\Vote\VotingHasFinished;

/**
 * Class DistributeCoins
 *
 * @package DreamsArk\Listeners\Project
 */
class DistributeCoins
{
    /**
     * Handle the event.
     *
     * @param VotingHasFinished $event
     */
    public function handle(VotingHasFinished $event)
    {

        $amount = round(
            $event->submission
                ->getAttribute('votes')
                ->sum('pivot.amount') / 3, 0, PHP_ROUND_HALF_DOWN
        );

        $event->submission->getAttribute('user')->bag->increment('coins', $amount);
        $event->submission->getAttribute('submissible')->project->user->bag->increment('coins', $amount);
    }
}
