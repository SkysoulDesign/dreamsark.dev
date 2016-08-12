<?php

namespace DreamsArk\Jobs\Project\Committee\Review;

use DreamsArk\Events\Project\Expenditure\ExpenditureWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Expenditures\Expense;
use DreamsArk\Models\Project\Project;

/**
 * Class ReviewCreateExpenseJob
 *
 * @package DreamsArk\Jobs\Project\Committee\Review
 */
class ReviewCreateExpenseJob extends Job
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
     * @param \DreamsArk\Models\Project\Expenditures\Expense $expense
     */
    public function handle(Expense $expense)
    {

        $expense->fill($this->fields)->save();

        $expenditure = $expense->expenditure()->create([
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
