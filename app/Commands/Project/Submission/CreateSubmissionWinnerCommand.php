<?php

namespace DreamsArk\Commands\Project\Submission;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Project\Idea\IdeaWinnerWasSelected;
use DreamsArk\Events\Project\Submission\SubmissionWinnerWasSelected;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Repositories\Project\Submission\SubmissionRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class CreateSubmissionWinnerCommand extends Command implements SelfHandling
{
    /**
     * @var Submission
     */
    private $submission;

    /**
     * Create a new command instance.
     *
     * @param Submission $submission
     */
    public function __construct(Submission $submission)
    {
        $this->submission = $submission;
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
         * Save the Winner
         */
        $repository->createWinner($this->submission->submissible, $this->submission->id);

        /**
         * Announce A SubmissionWinnerWasSelected
         */
        $event->fire(new SubmissionWinnerWasSelected($this->submission));

    }
}
