<?php

namespace DreamsArk\Jobs\Admin\Profile;

use DreamsArk\Events\Admin\Profile\ProfileWasUpdated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Profile;

/**
 * Class UpdateProfileJob
 *
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
    private $fields;

    /**
     * Create a new job instance.
     *
     * @param Profile $profile
     * @param array $fields
     */
    public function __construct(Profile $profile, array $fields)
    {
        $this->profile = $profile;
        $this->fields = $fields;
    }

    /**
     * Execute the job.
     *
     * @todo Implement Repository
     * @return Profile
     */
    public function handle()
    {

        $this->profile->questions()->sync(array_get($this->fields, 'questions', []));
        $this->profile->update($this->fields);

        /**
         * Announce Profile was Updated
         */
        event(new ProfileWasUpdated($this->profile));

        return $this->profile;

    }

}
