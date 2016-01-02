<?php

namespace DreamsArk\Listeners\Project\Vote;

use DreamsArk\Events\Event;
use DreamsArk\Repositories\Project\Vote\VoteRepositoryInterface;

class DeactivateVoting
{
    /**
     * @var VoteRepositoryInterface
     */
    private $repository;

    /**
     * Create the event listener.
     * @param VoteRepositoryInterface $repository
     */
    public function __construct(VoteRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Handle the event.
     *
     * @param Event $event
     */
    public function handle(Event $event)
    {
        $this->repository->deactivate($event->vote->id);
    }
}
