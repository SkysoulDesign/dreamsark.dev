<?php

namespace DreamsArk\Events\Project\Expenditure;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use Illuminate\Queue\SerializesModels;

class ExpenditureWasCreated extends Event
{
    use SerializesModels;

    /**
     * @var Expenditure
     */
    public $expenditure;

    /**
     * Create a new event instance.
     *
     * @param Expenditure $expenditure
     */
    public function __construct(Expenditure $expenditure)
    {
        $this->expenditure = $expenditure;
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
