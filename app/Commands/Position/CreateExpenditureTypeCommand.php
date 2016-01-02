<?php

namespace DreamsArk\Commands\Position;

use DreamsArk\Commands\Command;
use DreamsArk\Repositories\Project\Expenditure\ExpenditureRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;

class CreateExpenditureTypeCommand extends Command implements SelfHandling
{
    /**
     * Create a new command instance.
     *
     * @param $name
     */
    public function __construct($name)
    {
        $this->name = $name;
    }

    /**
     * Execute the command.
     *
     * @param ExpenditureRepositoryInterface $repository
     */
    public function handle(ExpenditureRepositoryInterface $repository)
    {
        /**
         * Create Position Type
         */
        $repository->createType($this->name);
    }
}
