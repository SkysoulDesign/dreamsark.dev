<?php

namespace DreamsArk\Jobs\User\Project;

use Carbon\Carbon;
use DreamsArk\Events\Project\Reward\RewardWasCreatedOrUpdated;
use DreamsArk\Events\User\Project\ProjectWasUpdated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Fund;

/**
 * Class UpdateProjectJob
 *
 * @package DreamsArk\Jobs\User\Project
 */
class UpdateProjectJob extends Job
{
    /**
     * @var \DreamsArk\Jobs\User\Project\Project
     */
    private $project;

    /**
     * @var array
     */
    private $fields;

    /**
     * Create a new job instance.
     *
     * @param Project $project
     * @param array $fields
     */
    public function __construct(Project $project, array $fields)
    {
        $this->project = $project;
        $this->fields = $fields;
    }

    /**
     * Execute the job.
     *
     * @param \Carbon\Carbon $carbon
     */
    public function handle(Carbon $carbon)
    {

        /**
         * If instance of fund update only the voting
         */
        if ($this->project->getAttribute('stageable') instanceof Fund) {

            /**
             * Fund doesnt need to update any field on it other than active and fail_reason
             */
            $this->fields = [];

        } else {

            $this->project->load(['stage.reward', 'stage.vote']);

            $reward = $this->project->getAttribute('stageable')->getAttribute('reward');
            $reward->update([
                'amount' => array_get($this->fields, 'reward')
            ]);

            /**
             * Announce RewardWasCreatedOrUpdated
             */
            event(new RewardWasCreatedOrUpdated(
                $reward, $this->project->getAttribute('user')
            ));

        }

        $this->project
            ->getAttribute('stageable')
            ->setAttribute('active', true)
            ->setAttribute('fail_reason', null)
            ->fill($this->fields)
            ->save();

        /**
         * Create Voting
         */
        $vote_open_date = $carbon->parse(array_get($this->fields, 'voting_date'));
        $vote_close_date = $vote_open_date->copy()->addMinutes(config('defaults.project.voting_span_time'));
        $vote = $this->project->getAttribute('stageable')->getAttribute('vote');

        $vote->update([
            'open_date' => $vote_open_date,
            'close_date' => $vote_close_date
        ]);

        /**
         * Announce ProjectWasCreated
         */
        event(new ProjectWasUpdated($this->project, $vote));

    }

}
