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
     * @var array
     */
    private $required;

    /**
     * Create a new job instance.
     *
     * @param array $fields
     * @param array $questions
     * @param array $required
     */
    public function __construct(array $fields, array $questions, array $required)
    {
        $this->fields = $fields;
        $this->questions = $questions;
        $this->required = $required;
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
         * FLip keys and append required pivot if key is find in the required params
         * Example: [1=> [required=>true]] translates to question $id 1 is required
         * in order to sync method work properly we have to pass an empty array otherwise
         * it will consider the value as the $id
         */
        $questions = [];

        foreach (array_flip($this->questions) as $id => $index) {
            $questions[$id] = in_array($id, $this->required) ? ['required' => true] : [];
        }

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
        $profile->questions()->sync($questions);

        /**
         * Announce ProfileWasCreated
         */
        event(new ProfileWasCreated($profile));

        return $profile;

    }

}
