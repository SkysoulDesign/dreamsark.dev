<?php

namespace DreamsArk\Jobs\Project\Expenditure;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Expenditures\Expenditure;
use DreamsArk\Models\User\User;

/**
 * Class UnrollProjectJob
 *
 * @package DreamsArk\Jobs\Project\Expenditure
 */
class UnrollProjectJob extends Job
{
    /**
     * @var Expenditure
     */
    private $expenditure;

    /**
     * @var User
     */
    private $user;

    /**
     * Create a new command instance.
     *
     * @param Expenditure $expenditure
     * @param User $user
     */
    public function __construct(Expenditure $expenditure, User $user)
    {
        $this->expenditure = $expenditure;
        $this->user = $user;
    }

    /**
     * Execute the command.
     */
    public function handle()
    {
        /**
         * Enroll into a Expenditure
         */
        $this->expenditure->enroller()->detach($this->user);
    }
}
