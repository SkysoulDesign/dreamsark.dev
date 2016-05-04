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
     * @var Expenditure|int
     */
    private $expenditure;

    /**
     * Create a new command instance.
     *
     * @param $expenditure
     */
    public function __construct($expenditure)
    {
        $this->expenditure = $expenditure;
    }

    /**
     * Execute the command.
     *
     * @param ExpenditureRepositoryInterface $repository
     */
    public function handle(ExpenditureRepositoryInterface $repository)
    {
        /**
         * Get The ID
         */
        $id = is_numeric($this->expenditure) ? $this->expenditure : $this->expenditure->id;

        /**
         * Delete Expenditure
         */
        $repository->delete($id);
    }
}
