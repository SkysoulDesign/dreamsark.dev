<?php

namespace DreamsArk\Jobs\Project\Stages\Voting;

use DreamsArk\Events\Project\Vote\Enroll\WinnerHasAssignedToCrew;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Expenditures\Crew;

/**
 * Class AssignVotingWinnerToCrewJob
 *
 * @package DreamsArk\Jobs\Project\Stages\Voting
 */
class AssignVotingWinnerToCrewJob extends Job
{
    /**
     * @var Crew
     */
    private $crew;

    /**
     * @var
     */
    private $winnerEnrollId;

    /**
     * Create a new job instance.
     *
     * @param Crew $crew
     * @param $winnerEnrollId
     */
    public function __construct(Crew $crew, $winnerEnrollId)
    {
        $this->crew = $crew;
        $this->winnerEnrollId = $winnerEnrollId;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {

        /** @var Crew $expenditure */
        $this->crew->enroller()->associate($this->winnerEnrollId);
        $this->crew->save();

        /**
         * Announce WinnerHasAssignedToCrew
         */
        event(new WinnerHasAssignedToCrew(
            $this->crew, $this->winnerEnrollId
        ));
    }
}
