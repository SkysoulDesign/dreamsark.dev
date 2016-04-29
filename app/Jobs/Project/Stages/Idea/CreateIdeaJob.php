<?php

namespace DreamsArk\Jobs\Project\Stages\Idea;

use DreamsArk\Events\Project\IdeaWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Repositories\Project\Idea\IdeaRepositoryInterface;

/**
 * Class CreateIdeaJob
 *
 * @package DreamsArk\Jobs\Project\Stages\Idea
 */
class CreateIdeaJob extends Job
{
    /**
     * @var int
     */
    private $project_id;

    /**
     * @var array
     */
    private $fields;
    /**
     * @var
     */
    private $ideaReward;
    private $chargeUserAmount;
    private $currentReward;

    /**
     * Create a new command instance.
     *
     * @param int $project_id
     * @param array $fields
     * @param $ideaReward
     */
    public function __construct($project_id, array $fields, $ideaReward)
    {
        $this->project_id = $project_id;
        $this->fields = collect($fields);
        $this->ideaReward = $ideaReward;
    }

    /**
     * Execute the command.
     *
     * @param IdeaRepositoryInterface $repository
     * @param Project $project
     * @return \DreamsArk\Models\Project\Stages\Idea
     */
    public function handle(IdeaRepositoryInterface $repository, Project $project)
    {
        $this->chargeUserAmount = $this->currentReward = 0;
        /**
         * Create Idea
         */
        $idea = $repository->create($this->project_id, $this->fields->all());

        $project = $project->find($this->project_id);
        $dataArr = ['amount' => $this->ideaReward, 'rewardable_id' => $idea->id];
        $class = get_class($idea);
        $rewardData = $project->getNextStageReward($class)->get();
        if (isset($rewardData[0])) {
            $this->currentReward = $rewardData[0]->amount;
            $project->stage->reward()->update($dataArr);
        } else {
            $project->rewards()->create(array_merge(['project_id' => $project->id, 'rewardable_type' => $class], $dataArr));
        }
        $this->chargeUserAmount = $this->ideaReward - $this->currentReward;

        /**
         * Announce IdeaWasCreated
         */
        event(new IdeaWasCreated($idea, $this->fields->get('voting_date'), $this->chargeUserAmount));

    }
}
