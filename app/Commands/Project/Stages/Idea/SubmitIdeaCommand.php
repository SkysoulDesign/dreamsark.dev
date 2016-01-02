<?php

namespace DreamsArk\Commands\Project\Stages\Idea;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Idea\IdeaWasSubmitted;
use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Project\Idea\IdeaRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class SubmitIdeaCommand extends Command implements SelfHandling
{

    /**
     * @var \DreamsArk\Models\Project\Stages\Idea
     */
    private $idea;

    /**
     * @var User
     */
    private $user;

    /**
     * @var array
     */
    private $fields;

    /**
     * Create a new command instance.
     *
     * @param Idea $idea
     * @param User $user
     * @param array $fields
     */
    public function __construct(\DreamsArk\Models\Project\Stages\Idea $idea, User $user, array $fields)
    {
        $this->idea = $idea;
        $this->user = $user;
        $this->fields = $fields;
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
         * Submit Idea
         */
        $submission = $repository->submit($this->idea->id, $this->user->id, $this->fields);

        /**
         * Announce IdeaWasSubmitted
         */
        $event->fire(new IdeaWasSubmitted($submission, $this->user));
    }
}
