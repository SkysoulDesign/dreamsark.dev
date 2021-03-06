<?php

namespace DreamsArk\Events\Project\Script;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Stages\Script;
use Illuminate\Queue\SerializesModels;

/**
 * Class ScriptWasCreated
 *
 * @package DreamsArk\Events\Project\Script
 */
class ScriptWasCreated extends Event
{

    use SerializesModels;

    /**
     * @var Script
     */
    public $model;

    /**
     * @var
     */
    public $voting_date;

    /**
     * @var
     */
    public $amount;

    /**
     * Create a new event instance.
     *
     * @param Script $script
     * @param $voting_date
     * @param $amount
     */
    public function __construct(Script $script, string $voting_date, int $amount)
    {
        $this->model = $script;
        $this->voting_date = $voting_date;
        $this->amount = $amount;
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
