<?php

namespace DreamsArk\Jobs\Project\Committee\Review;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Repositories\Project\Expenditure\ExpenditureRepositoryInterface;

/**
 * Class DestroyExpenditureJob
 *
 * @package DreamsArk\Jobs\Project\Committee\Review
 */
class DestroyExpenditureJob extends Job
{
    /**
     * @var Expenditure
     */
    private $expenditure;

    /**
     * Create a new command instance.
     *
     * @param Expenditure $expenditure
     */
    public function __construct(Expenditure $expenditure)
    {
        $this->expenditure = $expenditure;
    }

    /**
     * Execute the command.
     */
    public function handle()
    {
        $this->expenditure->getAttribute('expenditurable')->delete();
        $this->expenditure->delete();
    }
}
