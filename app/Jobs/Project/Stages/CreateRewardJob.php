<?php

namespace DreamsArk\Jobs\Project\Stages;

use DreamsArk\Events\Project\RewardWasCreated;
use DreamsArk\Jobs\Job;
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
     * @return Reward
     */
    public function handle() : Reward
    {

        $reward = $this->model->reward()->create([
            'amount' => $this->amount,
            'project_id' => $this->model->getRelation('project')->id
        ]);

        /**
         * Announce RewardWasCreated
         */
        event(new RewardWasCreated(
            $reward, $this->model->getRelation('project')->user
        ));

        return $reward;
    }
}
