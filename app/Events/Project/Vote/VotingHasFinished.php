<?php

namespace DreamsArk\Events\Project\Vote;

use DreamsArk\Events\Event;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Models\Project\Stages\Vote;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

/**
 * Class VotingHasFinished
 *
 * @package DreamsArk\Events\Project\Vote
 */
class VotingHasFinished extends Event
{

    use SerializesModels;

    /**
     * @var Vote
     */
    public $vote;

    /**
     * @var Collection
     */
    public $submissions;

    /**
     * @var Submission
     */
    public $submission;

    /**
     * Create a new event instance.
     *
     * @param Vote $vote
     * @param Submission $submission
     * @param Collection $losers
     */
    public function __construct(Vote $vote, Submission $submission, Collection $losers)
    {
        $this->vote = $vote;
        $this->submissions = $losers;
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
