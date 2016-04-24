<?php

namespace DreamsArk\Jobs\Admin\Profile;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Profile;

/**
 * Class DeleteProfileJob
 *
 * @package DreamsArk\Jobs\Admin\Profile
 */
class DeleteProfileJob extends Job
{
    /**
     * @var Profile
     */
    private $profile;

    /**
     * Create a new job instance.
     *
     * @param Profile $profile
     */
    public function __construct(Profile $profile)
    {
        $this->profile = $profile;
    }

    /**
     * Execute the job.
     *
     * @return bool|null
     * @throws \Exception
     * @todo implement Repository
     */
    public function handle()
    {
        return $this->profile->delete();
    }

}
