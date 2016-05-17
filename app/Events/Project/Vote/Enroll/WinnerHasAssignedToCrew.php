<?php

namespace DreamsArk\Events\Project\Vote\Enroll;

use DreamsArk\Events\Event;
use Illuminate\Queue\SerializesModels;

class WinnerHasAssignedToCrew extends Event
{
    use SerializesModels;
    /**
     * @var
     */
    public $expenditureId;
    /**
     * @var
     */
    public $winnerEnrollId;

    /**
     * Create a new event instance.
     *
     * @param $expenditureId
     * @param $winnerEnrollId
     */
    public function __construct($expenditureId, $winnerEnrollId)
    {
        $this->expenditureId = $expenditureId;
        $this->winnerEnrollId = $winnerEnrollId;
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
