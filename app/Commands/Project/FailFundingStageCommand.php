<?php

namespace DreamsArk\Commands\Project;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Project\FundingStageHasFailed;
use DreamsArk\Models\Project\Stages\Fund;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Database\Eloquent\Model;

class FailFundingStageCommand extends Command implements SelfHandling
{
    /**
     * @var Model
     */
    private $fund;

    /**
     * Create a new command instance.
     *
     * @param Model $fund
     */
    public function __construct(Fund $fund)
    {
        $this->fund = $fund;
    }

    /**
     * Execute the command.
     *
     * @param Dispatcher $event
     * @param Application $app
     */
    public function handle(Dispatcher $event, Application $app)
    {
        /**
         * Initialize its repository and fail it
         */
        $app->make($this->fund->repository)->fail($this->fund->id);

        /**
         * Announce StageHasFailed
         */
        $event->fire(new FundingStageHasFailed($this->fund));
    }
}
