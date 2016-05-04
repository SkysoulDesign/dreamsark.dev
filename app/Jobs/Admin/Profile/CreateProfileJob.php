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
    private $sections;

    /**
     * @var array
     */
    private $required;

    /**
     * Create a new job instance.
     *
     * @param array $fields
     * @param array $questions
     * @param array $sections
     * @param array $required
     */
    public function __construct(array $fields, array $questions, array $sections, array $required)
    {
        $this->fields = $fields;
        $this->questions = $questions;
        $this->sections = $sections;
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

        foreach ($this->questions as $id) {

            $data = [
                'required'   => in_array($id, $this->required),
                'section_id' => array_get($this->sections, $id, 1)
            ];

            array_set($questions, $id, $data);
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
