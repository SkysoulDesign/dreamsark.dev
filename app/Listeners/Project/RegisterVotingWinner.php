<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Events\Project\Submission\SubmissionWinnerWasSelected;
use DreamsArk\Events\Project\Vote\VotingHasFinished;

/**
 * Class RegisterVotingWinner
 *
 * @package DreamsArk\Listeners\Project
 */
class RegisterVotingWinner
{
    /**
     * Handle the event.
     *
     * @param VotingHasFinished $event
     */
    public function handle(VotingHasFinished $event)
    {
        /**
         * Save the Winner
         */
        $event->submission
            ->getAttribute('submissible')
            ->submission()
            ->associate($event->submission)
            ->setAttribute('active', false)
            ->save();

        /**
         * Announce SubmissionWinnerWasSelected
         */
        event(new SubmissionWinnerWasSelected(
            $event->submission
        ));
    }
}
