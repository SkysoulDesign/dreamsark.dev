<?php

namespace DreamsArk\Jobs\Admin\Profile;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Profile;

/**
 * Class CreateProfileJob
 * @package DreamsArk\Jobs\Admin\Profile
 */
class CreateProfileJob extends Job
{
    /**
     * @var array
     */
    private $request;

    /**
     * Create a new job instance.
     * @param array $request
     */
    public function __construct(array $request)
    {
        $this->request = $request;
    }

    /**
     * Execute the job.
     *
     * @param Profile $profile
     * @return bool
     */
    public function handle(Profile $profile)
    {
        $object = $profile->create($this->request);
        if ($object->id)
            return true;
        return false;
    }
}
