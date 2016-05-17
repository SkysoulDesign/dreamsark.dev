<?php

namespace DreamsArk\Jobs\Project\Stages\Voting;

use DreamsArk\Events\Project\Vote\Enroll\WinnerHasAssignedToCrew;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Expenditures\Crew;

class AssignVotingWinnerToCrewJob extends Job
{
    /**
     * @var
     */
    private $expenditureId;
    /**
     * @var
     */
    private $winnerEnrollId;

    /**
     * Create a new job instance.
     *
     * @param $expenditureId
     * @param $winnerEnrollId
     */
    public function __construct($expenditureId, $winnerEnrollId)
    {
        $this->expenditureId = $expenditureId;
        $this->winnerEnrollId = $winnerEnrollId;
    }

    /**
     * Execute the job.
     *
     * @param Crew $crew
     */
    public function handle(Crew $crew)
    {
        /** @var Crew $expenditure */
        $expenditure = $crew->find($this->expenditureId);
        $expenditure->setAttribute('enroller_id', $this->winnerEnrollId)->save();
        $expenditure->fresh();

        event(new WinnerHasAssignedToCrew($this->expenditureId, $this->winnerEnrollId));
    }
}
