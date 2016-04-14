<?php

namespace DreamsArk\Jobs\Admin\Profile;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Profile;

/**
 * Class UpdateProfileJob
 * @package DreamsArk\Jobs\Admin\Profile
 */
class UpdateProfileJob extends Job
{
    /**
     * @var Profile
     */
    private $profile;
    /**
     * @var array
     */
    private $request;


    /**
     * Create a new job instance.
     * @param Profile $profile
     * @param array $request
     */
    public function __construct(Profile $profile, array $request)
    {

        $this->profile = $profile;
        $this->request = $request;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->profile->update($this->request);
        return true;
    }
}
