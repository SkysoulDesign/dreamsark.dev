<?php

namespace DreamsArk\Events\Project\Submission;

use DreamsArk\Events\Event;
use Illuminate\Queue\SerializesModels;

/**
 * Class SubmissionWinnerWasSelected
 *
 * @package DreamsArk\Events\Project\Submission
 */
class SubmissionWinnerWasSelected extends Event
{

    use SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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
