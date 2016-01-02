<?php

namespace DreamsArk\Events\Idea;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Models\User\User;
use Illuminate\Queue\SerializesModels;

class IdeaWasSubmitted extends Event
{
    use SerializesModels;

    /**
     * @var User
     */
    public $user;

    /**
     * @var Submission
     */
    public $submission;

    /**
     * Create a new event instance.
     *
     * @param Submission $submission
     * @param User $user
     */
    public function __construct(Submission $submission, User $user)
    {
        $this->user = $user;
        $this->submission = $submission;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
