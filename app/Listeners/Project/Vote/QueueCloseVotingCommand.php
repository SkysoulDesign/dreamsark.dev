<?php

namespace DreamsArk\Listeners\Project\Vote;

use Carbon\Carbon;
use DreamsArk\Commands\Project\Stages\Voting\CloseVotingCommand;
use DreamsArk\Events\Project\Vote\VoteWasOpened;
use Illuminate\Queue\DatabaseQueue;
use Illuminate\Queue\QueueManager;

class QueueCloseVotingCommand
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
     * @param  VoteWasOpened $event
     * @return void
     */
    public function handle(VoteWasOpened $event)
    {

        /**
         * Queue OpenVoteCommand
         */
        $command = new CloseVotingCommand($event->vote);

        $delay = $event->vote->close_date->timestamp - $this->carbon->now()->timestamp;

        $this->queue->laterOn('voting', $delay, $command);

    }

}
