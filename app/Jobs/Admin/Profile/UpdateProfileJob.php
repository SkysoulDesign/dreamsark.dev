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
     * @var array
     */
    private $questions;
    /**
     * @var array
     */
    private $required;
    /**
     * @var array
     */
    private $category;

    /**
     * Create a new job instance.
     *
     * @param Profile $profile
     * @param array $fields
     * @param array $questions
     * @param array $required
     * @param array $category
     */
    public function __construct(Profile $profile, array $fields, array $questions, array $required, array $category)
    {
        $this->profile = $profile;
        $this->fields = $fields;
        $this->questions = $questions;
        $this->required = $required;
        $this->category = $category;
    }

    /**
     * Execute the job.
     *
     * @todo Implement Repository
     * @return Profile
     */
    public function handle()
    {

//        $this->profile->questions()->sync(array_get($this->fields, 'questions', []));
        /**
         * FLip keys and append required pivot if key is find in the required params
         * Example: [1=> [required=>true]] translates to question $id 1 is required
         * in order to sync method work properly we have to pass an empty array otherwise
         * it will consider the value as the $id
         */
        $questions = [];

        foreach (array_flip($this->questions) as $id => $index) {
            $questions[$id] = ['required' => (in_array($id, $this->required) ? true : false)];
            $questions[$id]['category'] = isset($this->category[$id])?$this->category[$id]:'general';
        }
        $this->profile->questions()->sync($questions);

        $this->profile->update($this->fields);

        /**
         * Announce Profile was Updated
         */
        event(new ProfileWasUpdated($this->profile));

        return $this->profile;

    }

}
