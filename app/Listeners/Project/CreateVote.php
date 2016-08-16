<?php

namespace DreamsArk\Listeners\Project;

use Carbon\Carbon;
use DreamsArk\Events\Event;
use DreamsArk\Events\Project\Vote\VoteWasCreated;

/**
 * Class CreateVote
 *
 * @package DreamsArk\Listeners\Project
 */
class CreateVote
{
    /**
     * @var Carbon
     */
    private $carbon;

    /**
     * Create the event listener.
     *
     * @param Carbon $carbon
     */
    public function __construct(Carbon $carbon)
    {
        $this->carbon = $carbon;
    }

    /**
     * Handle the event.
     *
     * @param  Event $event
     */
    public function handle(Event $event)
    {
        /**
         * Create Voting
         */
        $vote_open_date = $this->carbon->parse($event->voting_date);
        $vote_close_date = $vote_open_date->copy()->addMinutes(
            config('defaults.project.voting_span_time')
        );

        $vote = $event->stage->vote()->create([
            'open_date' => $vote_open_date,
            'close_date' => $vote_close_date
        ]);

        /**
         * Announce VoteWasCreated
         */
        event(new VoteWasCreated($vote));
    }
}
