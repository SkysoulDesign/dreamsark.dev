<?php

namespace DreamsArk\Listeners\Project\Vote;

use Carbon\Carbon;
use DreamsArk\Events\Event;
use DreamsArk\Jobs\Project\Stages\Voting\OpenVotingJob;
use Illuminate\Queue\DatabaseQueue;
use Illuminate\Queue\QueueManager;

/**
 * Class QueueOpenVotingCommand
 *
 * @package DreamsArk\Listeners\Project\Vote
 */
class QueueOpenVoting
{
    /**
     * @var QueueManager
     */
    private $queue;

    /**
     * @var Carbon
     */
    private $carbon;

    /**
     * QueueOpenVoteCommand constructor.
     *
     * @param DatabaseQueue|QueueManager $queue
     * @param Carbon $carbon
     */
    public function __construct(QueueManager $queue, Carbon $carbon)
    {
        $this->queue = $queue;
        $this->carbon = $carbon;
    }

    /**
     * Handle the event.
     *
     * @param Event $event
     */
    public function handle(Event $event)
    {

        $delay = $event->vote->open_date->timestamp - $this->carbon->now()->timestamp;

        $this->queue->laterOn('voting', $delay,
            new OpenVotingJob($event->vote)
        );
    }
}
