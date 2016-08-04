<?php

namespace DreamsArk\Jobs\Project;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Submission;
use DreamsArk\Models\User\User;
use Illuminate\Support\Collection;

/**
 * Class CreateInvestorsJob
 *
 * @package DreamsArk\Jobs\Project
 */
class CreateInvestorsJob extends Job
{
    /**
     * @var \DreamsArk\Models\Project\Submission
     */
    private $submission;

    /**
     * Create a new job instance.
     *
     * @param Submission $submission
     */
    public function __construct(Submission $submission)
    {
        $this->submission = $submission;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        /**
         * Looking forward for a BelongsToThrough solution
         */
        /** @var Project $project */
        $project = $this->submission->getAttribute('submissible')->project;

        $this->submission->getAttribute('votes')->map(function (User $user) use ($project) {
            $project->investors()->attach($user, [
                'amount' => $user->getAttribute('pivot')->amount
            ]);
        });
    }
}
