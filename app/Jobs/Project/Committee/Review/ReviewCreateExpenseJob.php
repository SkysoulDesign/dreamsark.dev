<?php

namespace DreamsArk\Jobs\Project\Committee\Review;

use DreamsArk\Events\Project\Expenditure\ExpenditureWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Repositories\Project\Review\ReviewRepositoryInterface;

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
        $this->fields = collect($fields);
    }

    /**
     * Execute the command.
     *
     * @param ReviewRepositoryInterface $repository
     */
    public function handle(ReviewRepositoryInterface $repository)
    {

        /**
         * Add Expense
         */
        $expenditure = $repository->createExpense($this->project->id, $this->fields->all());

        /**
         * Announce ExpenditureWasCreated
         */
        event(new ExpenditureWasCreated($expenditure));

    }
}
