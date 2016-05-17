<?php

namespace DreamsArk\Jobs\Project\Stages\Voting;

use DreamsArk\Commands\Project\FailFundingStageCommand;
use DreamsArk\Events\Project\Vote\VoteWasOpened;
use DreamsArk\Jobs\Job;
use DreamsArk\Jobs\Project\FailIdeaSynapseScriptStageJob;
use DreamsArk\Models\Project\Stages\Vote;
use DreamsArk\Models\Traits\EnrollableTrait;
use DreamsArk\Models\Traits\SubmissibleTrait;
use DreamsArk\Repositories\Project\Vote\VoteRepositoryInterface;
use Illuminate\Support\Collection;

class OpenVotingJob extends Job
{

    /**
     * @var Vote
     */
    private $vote;

    /**
     * Create a new command instance.
     *
     * @param Vote $vote
     */
    public function __construct(Vote $vote)
    {
        $this->vote = $vote;
    }

    /**
     * Execute the command.
     *
     * @param VoteRepositoryInterface $repository
     * @return array|null
     */
    public function handle(VoteRepositoryInterface $repository)
    {

        /**
         * Check if Class uses SubmissibleTrait
         */
        $isSubmissible = array_has(class_uses($this->vote->votable), SubmissibleTrait::class);

        /**
         * If there are no submission then project failed, or less than the minimum submissions
         */
        $class = snake_case(class_basename($this->vote->votable));
        if ($isSubmissible && $this->vote->votable->submissions->count() < config('defaults.project.' . $class . '.minimum_of_submissions')) {

            /**
             * Fail this project
             */
            dispatch(new FailIdeaSynapseScriptStageJob($this->vote->votable));

            return;
        }

        /**
         * Check if Class uses EnrollableTrait
         */
        $isEnrollable = array_has(class_uses($this->vote->votable), EnrollableTrait::class);

        if ($isEnrollable) {

            /**
             * If there are no users applied to any available
             * Expenditure/Position then the project has Failed
             */
            $this->vote->votable->enrollable->load('enrollers')->pluck('enrollers')->each(function ($item) {

                /**
                 * Check if there is no enrollers to this position
                 * Potentially can make different things for each empty item
                 *
                 * @var $item Collection
                 */
                if ($item->isEmpty()) {

                    /**
                     * Fail this project
                     */
                    dispatch(new FailFundingStageCommand($this->vote->votable));

                    return;
                }

            });

        }

        /**
         * Open Vote by setting Status to true
         */
        $repository->open($this->vote->id);

        /**
         * Announce VoteWasOpened
         */
        event(new VoteWasOpened($this->vote));

    }

}
