<?php

namespace DreamsArk\Jobs\Project\Committee\Review;

use DreamsArk\Events\Project\Expenditure\ExpenditureWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\Project\Expenditures\Dispense;
use DreamsArk\Models\Project\Project;

/**
 * Class ReviewCreateCrewJob
 *
 * @package DreamsArk\Jobs\Project\Committee\Review
 */
class ReviewCreateCrewJob extends Job
{
    /**
     * @var Project
     */
    private $project;

    /**
     * @var array
     */
    private $fields;

    /**
     * Create a new command instance.
     *
     * @param Project $project
     * @param array $fields
     */
    public function __construct(Project $project, array $fields)
    {
        $this->project = $project;
        $this->fields = $fields;
    }

    /**
     * Execute the command.
     *
     * @param \DreamsArk\Models\Master\Profile $profile
     * @param \DreamsArk\Models\Project\Expenditures\Dispense $dispense
     */
    public function handle(Profile $profile, Dispense $dispense)
    {

        $profile = $profile->findOrFail($this->fields['profile_id']);

        $crew = $profile->crew()->create(
            $this->fields
        );

        $dispense->crew()->associate($crew);
        $dispense->setAttribute('amount', $this->fields['cost']);
        $dispense->fill([
            'type' => 'salary',
            'description' => 'Salary received from project',
        ]);
        $dispense->save();

        $expenditure = $crew->expenditure()->create([
            'project_id' => $this->project->getKey()
        ]);

        /**
         * Announce ExpenditureWasCreated
         */
        event(new ExpenditureWasCreated(
            $expenditure
        ));
    }
}
