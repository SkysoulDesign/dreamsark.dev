<?php

namespace DreamsArk\Jobs\Project;

use DreamsArk\Events\Project\ProjectWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\Project\Stages\Script;
use DreamsArk\Models\Project\Stages\Synapse;
use DreamsArk\Models\User\User;
use DreamsArk\Repositories\Project\ProjectRepositoryInterface;


/**
 * Class CreateProjectJob
 *
 * @package DreamsArk\Commands\Project
 */
class CreateProjectJob extends Job
{
    /**
     * @var array
     */
    private $fields;

    /**
     * @var User
     */
    private $user;

    /**
     * @var array
     */
    private $rewards;

    /**
     * CreateProjectJob constructor.
     *
     * @param User $user
     * @param array $fields
     * @param array $rewards
     */
    public function __construct(User $user, array $fields, array $rewards = [])
    {
        $this->user = $user;
        $this->fields = collect($fields);
        $this->rewards = $rewards;
    }

    /**
     * Execute the command.
     *
     * @param ProjectRepositoryInterface $repository
     * @return Project
     */
    public function handle(ProjectRepositoryInterface $repository)
    {

        $type = 'idea';

        /**
         * Create Project
         */
        $project = $repository->create($this->user->id, $type, $this->fields->all());
        $rewardClass = '';
        foreach ($this->rewards as $type => $reward) {
            if ((int)$reward > 0) {
                switch ($type) {
                    case 'idea':
                        $rewardClass = Idea::class;
                        break;
                    case 'synapse':
                        $rewardClass = Synapse::class;
                        break;
                    case 'script':
                        $rewardClass = Script::class;
                        break;
                }
                $insArr = ['project_id' => $project->id, 'rewardable_type' => $rewardClass, 'amount' => (int)$reward];
                $project->rewards()->create($insArr);
            }
        }

        $project->fresh();

        /**
         * Announce ProjectWasCreated
         */
        event(new ProjectWasCreated(
            $this->user, $project, $this->fields, $this->rewards
        ));

        return $project->fresh();

    }
}
