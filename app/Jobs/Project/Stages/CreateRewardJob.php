<?php

namespace DreamsArk\Jobs\Project\Stages;

use DreamsArk\Events\Project\Reward\RewardWasCreatedOrUpdated;
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
     * @var \Illuminate\Database\Eloquent\Model
     */
    private $model;

    /**
     * @var int
     */
    private $amount;

    /**
     * Create a new job instance.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
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

        $reward = $this->model->reward()->create([
            'amount' => $this->amount,
            'project_id' => $this->model->getAttribute('project')->id,
            'points' => null
        ]);

        $reward->items()->saveMany(
            $item->groups(['a', 'b', 'c'])->weighted()->limit(5)->get(['id'])
        );

        /**
         * Announce RewardWasCreated
         */
        event(new RewardWasCreatedOrUpdated(
            $reward, $this->model->getRelation('project')->user
        ));

        return $reward;
    }
}
