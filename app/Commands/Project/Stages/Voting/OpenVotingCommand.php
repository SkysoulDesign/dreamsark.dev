<?php

namespace DreamsArk\Commands\Project\Stages\Voting;

use DreamsArk\Commands\Command;
use DreamsArk\Commands\Project\FailFundingStageCommand;
use DreamsArk\Commands\Project\FailIdeaSynapseScriptStageCommand;
use DreamsArk\Events\Project\Vote\VoteWasOpened;
use DreamsArk\Models\Project\Stages\Vote;
use DreamsArk\Models\Traits\EnrollableTrait;
use DreamsArk\Models\Traits\SubmissibleTrait;
use DreamsArk\Repositories\Project\Vote\VoteRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class OpenVotingCommand extends Command implements SelfHandling
{
    use SerializesModels, DispatchesJobs;

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
     * @param Dispatcher $event
     * @return array|null
     */
    public function handle(VoteRepositoryInterface $repository, Dispatcher $event)
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
            $this->dispatch(new FailIdeaSynapseScriptStageCommand($this->vote->votable));

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
                    $this->dispatch(new FailFundingStageCommand($this->vote->votable));

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
        $event->fire(new VoteWasOpened($this->vote));

    }

}
