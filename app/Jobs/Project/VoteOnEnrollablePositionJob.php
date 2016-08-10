<?php

namespace DreamsArk\Jobs\Project;

use DreamsArk\Events\Project\Fund\EnrollerReceivedVote;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Expenditures\Enroller;
use DreamsArk\Models\Project\Expenditures\Vote;
use DreamsArk\Models\User\User;

/**
 * Class VoteOnEnrollablePositionJob
 *
 * @package DreamsArk\Jobs\Project
 */
class VoteOnEnrollablePositionJob extends Job
{
    /**
     * @var Enroller
     */
    private $enroller;

    /**
     * @var User
     */
    private $user;

    /**
     * @var int
     */
    private $amount;

    /**
     * Create a new command instance.
     *
     * @param Enroller $enroller
     * @param User $user
     * @param int $amount
     */
    public function __construct(Enroller $enroller, User $user, int $amount)
    {
        $this->enroller = $enroller;
        $this->user = $user;
        $this->amount = $amount;
    }

    /**
     * Execute the command.
     *
     * @param \DreamsArk\Models\Project\Expenditures\Vote $vote
     */
    public function handle(Vote $vote)
    {

        $vote->enroller()->associate($this->enroller);
        $vote->user()->associate($this->user);
        $vote->setAttribute('amount', $this->amount);
        $vote->save();

        /**
         * Announce EnrollerReceivedVote
         */
        event(new EnrollerReceivedVote(
            $this->enroller, $this->user, $this->amount
        ));
    }
}
