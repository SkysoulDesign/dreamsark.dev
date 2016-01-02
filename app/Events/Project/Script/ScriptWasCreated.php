<?php

namespace DreamsArk\Events\Project\Script;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Stages\Script;
use Illuminate\Queue\SerializesModels;

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
     * Create a new event instance.
     *
     * @param Script $script
     * @param $voting_date
     */
    public function __construct(Script $script, $voting_date)
    {
        $this->model = $script;
        $this->voting_date = $voting_date;
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
