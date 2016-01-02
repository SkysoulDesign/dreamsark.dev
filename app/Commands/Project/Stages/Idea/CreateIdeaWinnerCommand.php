<?php

namespace DreamsArk\Commands\Project\Stages\Idea;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Project\Idea\IdeaWinnerWasSelected;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Repositories\Project\Idea\IdeaRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class CreateIdeaWinnerCommand extends Command implements SelfHandling
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
     * @param IdeaRepositoryInterface $repository
     * @param Dispatcher $event
     */
    public function handle(IdeaRepositoryInterface $repository, Dispatcher $event)
    {

        /**
         * Save the Winner
         */
        $repository->createWinner($this->submission->idea->id, $this->submission->id);

        /**
         * Announce A IdeaWinnerWasSelected
         */
        $event->fire(new IdeaWinnerWasSelected($this->submission->idea));

    }
}
