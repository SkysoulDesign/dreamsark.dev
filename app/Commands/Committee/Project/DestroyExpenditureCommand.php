<?php

namespace DreamsArk\Commands\Committee\Project;

use DreamsArk\Commands\Command;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Repositories\Project\Expenditure\ExpenditureRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;

class DestroyExpenditureCommand extends Command implements SelfHandling
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
