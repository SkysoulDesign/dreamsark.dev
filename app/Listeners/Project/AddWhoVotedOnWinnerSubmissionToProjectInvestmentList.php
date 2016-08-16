<?php

namespace DreamsArk\Listeners\Project;

use DreamsArk\Events\Project\Vote\VotingHasFinished;
use DreamsArk\Models\User\User;

/**
 * Class RegisterVotingWinner
 *
 * @package DreamsArk\Listeners\Project
 */
class AddWhoVotedOnWinnerSubmissionToProjectInvestmentList
{
    /**
     * Handle the event.
     *
     * @param VotingHasFinished $event
     */
    public function handle(VotingHasFinished $event)
    {
        /**
         * Looking forward for a BelongsToThrough solution
         */
        /** @var Project $project */
        $project = $event->submission->getAttribute('submissible')->project;
        $event->submission->getAttribute('votes')->map(function (User $user) use ($project) {
            $project->investors()->attach($user, [
                'amount' => $user->getAttribute('pivot')->amount
            ]);
        });
    }
}
