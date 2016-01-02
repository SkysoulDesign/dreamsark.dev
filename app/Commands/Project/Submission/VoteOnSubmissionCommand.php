<?php

namespace DreamsArk\Commands\Project\Submission;

use DreamsArk\Commands\Bag\DeductCoinCommand;
use DreamsArk\Commands\Command;
use DreamsArk\Events\Project\Submission\SubmissionReceivedAVote;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Project\Submission\SubmissionRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Foundation\Bus\DispatchesJobs;

class VoteOnSubmissionCommand extends Command implements SelfHandling
{

    use DispatchesJobs;

    /**
     * @var
     */
    private $amount;

    /**
     * @var Submission
     */
    private $submission;

    /**
     * @var User
     */
    private $user;

    /**
     * Create a new command instance.
     *
     * @param int $amount
     * @param Submission $submission
     * @param User $user
     */
    public function __construct($amount, Submission $submission, User $user)
    {
        $this->amount = $amount;
        $this->submission = $submission;
        $this->user = $user;
    }

    /**
     * Execute the command.
     *
     * @param SubmissionRepositoryInterface $repository
     * @param Dispatcher $event
     */
    public function handle(SubmissionRepositoryInterface $repository, Dispatcher $event)
    {
        /**
         * Vote on a Idea Submission
         */
        $repository->vote($this->amount, $this->submission->id, $this->user->id);

        /**
         * Announce a SubmissionReceivedAVote
         */
        $event->fire(new SubmissionReceivedAVote($this->amount, $this->submission, $this->user));
    }
}
