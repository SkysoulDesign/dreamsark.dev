<?php

namespace DreamsArk\Events\Project\Vote\Enroll;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Expenditures\Crew;
use Illuminate\Queue\SerializesModels;

/**
 * Class WinnerHasAssignedToCrew
 *
 * @package DreamsArk\Events\Project\Vote\Enroll
 */
class WinnerHasAssignedToCrew extends Event
{
    
    use SerializesModels;

    /**
     * @var \DreamsArk\Models\Project\Expenditures\Crew
     */
    private $crew;
    
    /**
     * @var int
     */
    public $winnerEnrollId;

    /**
     * Create a new event instance.
     *
     * @param \DreamsArk\Models\Project\Expenditures\Crew $crew
     * @param $winnerEnrollId
     */
    public function __construct(Crew $crew, $winnerEnrollId)
    {
        $this->crew = $crew;
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
