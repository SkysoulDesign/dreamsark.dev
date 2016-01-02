<?php

namespace DreamsArk\Events\Project\Submission;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Submission;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class SubmissionWasSent extends Event
{
    use SerializesModels;

    /**
     * @var Submission
     */
    public $submission;

    /**
     * Create a new event instance.
     *
     * @param Submission $submission
     */
    public function __construct(Submission $submission)
    {
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
