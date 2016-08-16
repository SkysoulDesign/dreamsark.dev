<?php

namespace DreamsArk\Jobs\Project\Stages;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Game\Item;
use DreamsArk\Models\Project\Reward;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CreateRewardJob
 *
 * @package DreamsArk\Jobs\Project\Stages
 */
class CreateRewardJob extends Job
{
    /**
     * @var Model
     */
    private $model;

    /**
     * @var int
     */
    private $amount;

    /**
     * Create a new job instance.
     *
     * @param Model $model
     * @param int $amount
     */
    public function __construct(Model $model, int $amount)
    {
        $this->model = $model;
        $this->amount = $amount;
    }

    /**
     * Execute the job.
     *
     * @param \DreamsArk\Models\Game\Item $item
     * @return \DreamsArk\Models\Project\Reward
     */
    public function handle(Item $item) : Reward
    {


    }
}
