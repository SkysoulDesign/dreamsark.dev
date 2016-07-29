<?php

namespace DreamsArk\Jobs\Project\Stages\Traits;


use DreamsArk\Models\Project\Project;
use Illuminate\Database\Eloquent\Model;

/**
 * Class UpdateProjectStageReward
 *
 * @package DreamsArk\Jobs\Project\Stages\Traits
 */
trait UpdateProjectStageReward
{

    /**
     * Update Reward Amount to Project Stages [Synapse, Script]
     *
     * @param Project $project
     * @param Model $model
     */
    protected function updateReward(Project $project, Model $model)
    {
        $reward = $this->newReward;
        $dataArr = ['amount' => $reward, 'rewardable_id' => $model->id];
        if (isset($project->getNextStageReward[0])) {
            $this->currentReward = $project->getNextStageReward[0]->amount;
            $project->getNextStageReward()->update($dataArr);
        } else {
            $project->rewards()->create(array_merge(['project_id' => $project->id, 'rewardable_type' => get_class($model)], $dataArr));
        }
    }

    protected function initializeRewardValues()
    {
        $this->newReward = $this->fields->get('reward', 0);
        $this->currentReward = 0;
        $this->chargeUserAmount = 0;
    }

    protected function calculateChargeAmount()
    {
        $this->chargeUserAmount = $this->newReward - $this->currentReward;
    }
}
