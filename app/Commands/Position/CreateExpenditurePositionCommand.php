<?php

namespace DreamsArk\Commands\Position;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Position\ExpenditurePositionWasCreated;
use DreamsArk\Repositories\Project\Expenditure\ExpenditureRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;

class CreateExpenditurePositionCommand extends Command implements SelfHandling
{
    /**
     * @var string
     */
    private $positionName;

    /**
     * @var int
     */
    private $type_id;

    /**
     * Create a new command instance.
     *
     * @param string $positionName
     * @param int $type_id
     */
    public function __construct($positionName, $type_id)
    {
        $this->positionName = $positionName;
        $this->type_id = $type_id;
    }

    /**
     * Execute the command.
     *
     * @param ExpenditureRepositoryInterface $repository
     * @param Dispatcher $event
     */
    public function handle(ExpenditureRepositoryInterface $repository, Dispatcher $event)
    {
        /**
         * Create Position
         */
        $position = $repository->create($this->positionName, $this->type_id);

        /**
         * Announce ExpenditurePositionWasCreated
         */
        $event->fire(new ExpenditurePositionWasCreated($position));
    }
}
