<?php

namespace DreamsArk\Jobs\User\Profile;

use DreamsArk\Events\User\Profile\UserProfileWasCreated;
use DreamsArk\Jobs\General\UploadUserContentJob;
use DreamsArk\Jobs\Job;
use DreamsArk\Jobs\User\Traits\ProfileTrait;
use DreamsArk\Models\Master\Answer;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\User\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

/**
 * Class CreateProfileJob
 *
 * @package DreamsArk\Jobs\User\Profile
 */
class CreateProfileJob extends Job
{

    use ProfileTrait;

    /**
     * @var array
     */
    private $fields;

    /**
     * @var User
     */
    private $user;

    /**
     * @var Profile
     */
    private $profile;

    /**
     * Create a new job instance.
     *
     * @param array $fields
     * @param User $user
     * @param Profile $profile
     */
    public function __construct(array $fields, User $user, Profile $profile)
    {
        $this->fields = $fields;
        $this->user = $user;
        $this->profile = $profile;
    }

    /**
     * Execute the job.
     *
     * @param Answer $answer
     * @return User
     */
    public function handle(Answer $answer)
    {
        /**
         * Create Answer Model
         */
        $answer->profile()->associate($this->profile);
        $answer->save();

        /**
         * Get all user replies for the questions
         */
        $replies = $this->array_filter_keys($this->fields, 'question_');

        /**
         * Collection of options that should be sync
         */
        $options = [];

        /** @var Collection $questions */
        $questions = $this->profile->questions->keyBy('id')->map(function ($question, $id) use (&$options, $replies) {

            /**
             * Get User Reply or Default to null
             */
            if (!$content = array_get($replies, $id)) {
                return false;
            }

            /**
             * If user has selected a file to be uploaded
             */
            if ($content instanceof UploadedFile) {

                /**
                 * Upload File to the server
                 */
                $content = dispatch(new UploadUserContentJob($content, $this->user, $question->type->name));

                /**
                 * Override the reply with the file path
                 */
//                array_set($replies, $id, $content);
                array_push($replies, $content);

            }

            if (in_array($question->type->name, ['checkbox', 'select', 'radio'])) {

                /**
                 * for each reply as option $ID
                 */
                foreach ($content as $option) {
                    array_push($options, [
                        'option_id'   => $option,
                        'question_id' => $id
                    ]);
                }

                /**
                 * return false to avoid item been re-added to array
                 */
                return false;

            }

            /**
             * if there is a reply, add it to content
             */
            return compact('content');

        });

        /**
         * Sync Replies
         */
        $answer->questions()->sync(array_filter($questions->toArray()));

        /**
         * Sync options
         */
        $answer->options()->sync($options);

        /**
         * Assign Profile to user
         */
        $this->user->profiles()->attach($this->profile->getAttribute('id'), [
            'answer_id' => $answer->getAttribute('id')
        ]);

        /**
         * Announce UserProfileWasCreated
         */
        event(new UserProfileWasCreated($this->user, $this->profile));

        return $this->user;

    }

    /**
     * Filter Array by keys
     *
     * @param array $array
     * @param string $filter
     * @return array
     */
    public function array_filter_keys(array $array, $filter)
    {

        $result = [];

        foreach ($array as $key => $value) {
            if (strpos($key, $filter) === 0) {
                array_set($result, last(explode($filter, $key)), $value);
            }
        }

        return $result;

    }

}
