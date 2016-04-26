<?php

namespace DreamsArk\Jobs\User\Profile;

use DreamsArk\Events\User\Profile\UserProfileWasUpdated;
use DreamsArk\Jobs\Job;
use DreamsArk\Jobs\User\Traits\ProfileTrait;
use DreamsArk\Models\Master\Answer;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\User\User;
use Symfony\Component\HttpFoundation\FileBag;

/**
 * Class UpdateProfileJob
 *
 * @package DreamsArk\Jobs\User\Profile
 */
class UpdateProfileJob extends Job
{
    use ProfileTrait;
    /**
     * @var array
     */
    protected $dataArr = [];
    /**
     * @var array
     */
    private $fields;
    /**
     * @var User
     */
    private $user;
    /**
     * @var
     */
    private $profile;
    /**
     * @var
     */
    private $answer;
    /**
     * @var FileBag
     */
    private $file;

    /**
     * Create a new job instance.
     *
     * @param array $fields
     * @param User $user
     * @param $profile
     */
    public function __construct(array $fields, $user, $profile)
    {
        $this->fields = $fields;
        $this->user = $user;
        $this->profile = $profile;
    }

    /**
     * Execute the job.
     *
     * @param Answer $answer
     * @param User $user
     * @param Profile $profile
     * @return User
     */
    public function handle(Answer $answer, User $user, Profile $profile)
    {
        $this->createObjectIfNotExists($user, $profile);
        $answer = $answer->find($this->profile->pivot->answer_id);
        /** @var array $currentAnswers */
        $currentAnswers = $this->profile->answers->pluck('pivot')->keyBy('question_id')->toArray();
        $answer->questions()->sync([]);
        $this->buildDataArrForUpdate($currentAnswers, 'required');
        $this->buildDataArrForUpdate($currentAnswers, 'general');
        $answer->questions()->sync($this->dataArr);

        /**
         * Announce UserProfileWasUpdated
         */
        event(new UserProfileWasUpdated($this->user, $this->profile));

        return $this->user;
    }

}
