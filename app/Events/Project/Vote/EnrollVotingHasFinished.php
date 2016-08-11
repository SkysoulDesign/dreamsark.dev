<?php

namespace DreamsArk\Events\Project\Vote;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Vote;
use Illuminate\Queue\SerializesModels;

/**
 * Class EnrollVotingHasFinished
 *
 * @package DreamsArk\Events\Project\Vote
 */
class EnrollVotingHasFinished extends Event
{

    use SerializesModels;

    /**
     * @var Project
     */
    public $project;

    /**
     * @var Fund
     */
    public $fund;

    /**
     * @var Vote
     */
    public $vote;

    /**
     * Create a new event instance.
     *
     * @param \DreamsArk\Models\Project\Project $project
     * @param \DreamsArk\Models\Project\Stages\Fund $fund
     * @param \DreamsArk\Models\Project\Stages\Vote $vote
     */
    public function __construct(Project $project, Fund $fund, Vote $vote)
    {
        $this->project = $project;
        $this->fund = $fund;
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
