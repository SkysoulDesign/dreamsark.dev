<?php

namespace DreamsArk\Commands\Project\Review;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Project\Expenditure\ExpenditureWasCreated;
use DreamsArk\Models\Project\Project;
use DreamsArk\Repositories\Project\Review\ReviewRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class ReviewCreateExpense extends Command implements SelfHandling
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
     * @param Dispatcher $event
     */
    public function handle(ReviewRepositoryInterface $repository, Dispatcher $event)
    {

        /**
         * Add Expense
         */
        $expenditure = $repository->createExpense($this->project->id, $this->fields->pull('position'), $this->fields->all());

        /**
         * Announce ExpenditureWasCreated
         */
        $event->fire(new ExpenditureWasCreated($expenditure));

    }
}
