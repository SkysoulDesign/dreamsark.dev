<?php

namespace DreamsArk\Events\Project\Vote;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Stages\Vote;
use Illuminate\Queue\SerializesModels;

class EnrollVotingHasFinished extends Event
{
    use SerializesModels;
    /**
     * @var
     */
    public $projectId;
    /**
     * @var
     */
    public $fundId;
    /**
     * @var
     */
    public $vote;

    /**
     * Create a new event instance.
     *
     * @param $projectId
     * @param $fundId
     * @param $vote
     */
    public function __construct($projectId, $fundId, Vote $vote)
    {
        $this->projectId = $projectId;
        $this->fundId = $fundId;
        $this->vote = $vote;
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
