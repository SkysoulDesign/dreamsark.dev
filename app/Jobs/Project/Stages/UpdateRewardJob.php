<?php

namespace DreamsArk\Jobs\Project\Stages;

use DreamsArk\Events\Project\RewardStageWasUpdated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use Illuminate\Database\Eloquent\Model;

class UpdateRewardJob extends Job
{
    /**
     * @var Project
     */
    private $project;
    /**
     * @var Model
     */
    private $stage;
    /**
     * @var
     */
    private $chargeAmount;

    /**
     * Create a new job instance.
     *
     * @param Project $project
     * @param Model $stage
     */
    public function __construct(Project $project, Model $stage, $chargeAmount)
    {
        //
        $this->project = $project;
        $this->stage = $stage;
        $this->chargeAmount = $chargeAmount;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->stage->reward == null) {
            $reward_type = get_class($this->stage);
            /** @var Model $rewardObj */
            $this->project->rewards()->where('rewardable_type', $reward_type)->update(['rewardable_id' => $this->stage->id]);
        }
        event(new RewardStageWasUpdated($this->stage->fresh(), $this->chargeAmount));
    }
}
