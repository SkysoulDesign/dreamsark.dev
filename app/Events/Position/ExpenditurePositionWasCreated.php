<?php

namespace DreamsArk\Events\Position;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Expenditures\Position;
use Illuminate\Queue\SerializesModels;

class ExpenditurePositionWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var Position
     */
    public $position;

    /**
     * Create a new event instance.
     *
     * @param Position $position
     */
    public function __construct(Position $position)
    {
        $this->position = $position;
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
