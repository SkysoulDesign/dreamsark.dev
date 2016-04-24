<?php

namespace DreamsArk\Jobs\Admin\Profile;

use DreamsArk\Events\Admin\Profile\ProfileWasCreated;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Profile;

/**
 * Class CreateProfileJob
 *
 * @package DreamsArk\Jobs\Admin\Profile
 */
class CreateProfileJob extends Job
{
    /**
     * @var array
     */
    private $fields;

    /**
     * @var array
     */
    private $questions;

    /**
     * Create a new job instance.
     *
     * @param array $fields
     * @param array $questions
     */
    public function __construct(array $fields, array $questions)
    {
        $this->fields = $fields;
        $this->questions = $questions;
    }

    /**
     * Execute the job.
     *
     * @param Profile $profile
     * @return Profile
     */
    public function handle(Profile $profile)
    {

        /**
         * Create Profile
         *
         * @todo Implement Repositories
         */
        $profile = $profile->create($this->fields);

        /**
         * Sync Questions
         *
         * @todo Implement Repositories
         */
        $profile->questions()->sync($this->questions);

        /**
         * Announce ProfileWasCreated
         */
        event(new ProfileWasCreated($profile));

        return $profile;

    }

}
