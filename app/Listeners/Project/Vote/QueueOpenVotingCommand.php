<?php

namespace DreamsArk\Listeners\Project\Vote;

use Carbon\Carbon;
use DreamsArk\Events\Project\Vote\VoteWasCreated;
use DreamsArk\Jobs\Project\Stages\Voting\OpenVotingJob;
use Illuminate\Queue\DatabaseQueue;
use Illuminate\Queue\QueueManager;

class QueueOpenVotingCommand
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
     * @param  VoteWasCreated $event
     * @return void
     */
    public function handle(VoteWasCreated $event)
    {

        /**
         * Queue OpenVoteCommand
         */
        $command = new OpenVotingJob($event->vote);

        $delay = $event->vote->open_date->timestamp - $this->carbon->now()->timestamp;

        $this->queue->laterOn('voting', $delay, $command);

    }

}
