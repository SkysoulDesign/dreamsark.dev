<?php

namespace DreamsArk\Jobs\Project\Stages\Voting;

use DreamsArk\Commands\Project\FailFundingStageCommand;
use DreamsArk\Events\Project\Vote\VoteWasOpened;
use DreamsArk\Jobs\Job;
use DreamsArk\Jobs\Project\FailProjectStageJob;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Models\Project\Stages\Vote;
use DreamsArk\Models\Traits\EnrollableTrait;
use DreamsArk\Models\Traits\SubmissibleTrait;
use Illuminate\Support\Collection;

/**
 * Class OpenVotingJob
 *
 * @package DreamsArk\Jobs\Project\Stages\Voting
 */
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
     */
    public function handle()
    {

        $votable = $this->vote->getAttribute('votable');

        /**
         * If instance of fund fail it if no enough user enrolled on it
         */
        if ($votable instanceof Fund) {

            /**
             * Fail Project if there is no enough Enrollers
             */
            $enrollers = $votable->getAttribute('enrollable')->pluck('enrollers');

            if ($enrollers->count() !== $enrollers->reject(function ($items) {
                    return $items->isEmpty();
                })->count()
            ) {
                return dispatch(new FailProjectStageJob(
                    $votable, Project::FAIL_REASON_NO_ENROLLERS
                ));
            }

        }

        /**
         * Check if Class uses SubmissibleTrait
         */
        $isSubmissible = array_has(class_uses($votable), SubmissibleTrait::class);

        /**
         * If there are no submission then project failed, or less than the minimum submissions
         */
        $stage = $votable->getStageName();
        $config = config("defaults.project.$stage.minimum_of_submissions");

        if ($isSubmissible && $votable->submissions->count() < $config) {

            /**
             * Fail this project
             */
            return dispatch(new FailProjectStageJob(
                $votable, Project::FAIL_REASON_NO_ENOUGH_SUBMISSIONS
            ));

        }

        /**
         * Check if Class uses EnrollableTrait
         */
        $isEnrollable = array_has(class_uses($votable), EnrollableTrait::class);

        if ($isEnrollable) {

            /**
             * If there are no users applied to any available
             * Expenditure/Position then the project has Failed
             */
            $votable->enrollable->load('enrollers')->pluck('enrollers')->each(function ($item) use ($votable) {

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
                    dispatch(new FailFundingStageCommand($votable));

                    return;
                }

            });

        }

        /**
         * Open Vote by setting Status to true
         */
        $this->vote
            ->setAttribute('active', true)
            ->save();

        /**
         * Announce VoteWasOpened
         */
        event(new VoteWasOpened($this->vote));
    }
}
