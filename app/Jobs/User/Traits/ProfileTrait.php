<?php

namespace DreamsArk\Jobs\User\Traits;


use Config;
use DreamsArk\Jobs\General\UploadFilesJob;
use DreamsArk\Models\Master\Answer;
use DreamsArk\Models\Master\Profile;
use DreamsArk\Models\User\User;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class ProfileTrait
 *
 * @package DreamsArk\Jobs\User\Traits
 */
trait ProfileTrait
{

    /**
     * @var string
     */
    private $uploadType = 'user-profiles';

    /**
     * @param User $user
     * @param Profile $profile
     */
    public function createObjectIfNotExists(User $user, Profile $profile)
    {
        /**
         * Retrieve User Model
         */
        if (!is_object($this->user))
            $this->user = $user->findOrFail($this->user);

        /**
         * Retrieve Profile Model
         */
        if (!is_object($this->profile))
            $this->profile = $profile->findOrFail($this->profile);
    }

    /**
     * @param array $currentAnswers
     * @param $index
     */
    protected function buildDataArrForUpdate(array $currentAnswers, $index)
    {
        if (isset($this->fields['questions'][$index]))
            foreach ($this->fields['questions'][$index] as $type => $data) {
                foreach ($data as $id => $reply) {
                    if (in_array($type, ['file', 'image', 'video'])) {
                        $reply = $this->doFileUpload($reply, $type, $id);
                        if ($reply == '' && isset($currentAnswers[$id]))
                            $reply = $currentAnswers[$id]['content'];
                    } else if(in_array($type, ['checkbox']))
                        $reply = json_encode($reply);
                    if ($reply != '')
                        $this->dataArr[] = ['question_id' => $id, 'content' => $reply];
                }
            }
    }

    /**
     * @param Answer $answer
     * @param $index
     */
    protected function doInsertQuestions(Answer $answer, $index)
    {
        if (isset($this->fields['questions'][$index]))
            foreach ($this->fields['questions'][$index] as $type => $data) {
                foreach ($data as $id => $reply) {
                    if (in_array($type, ['file', 'image', 'video'])) {
                        $reply = $this->doFileUpload($reply, $type, $id);
                    } else if(in_array($type, ['checkbox']))
                        $reply = json_encode($reply);
                    if ($reply != '')
                        $answer->questions()->attach($id, [
                            'content' => $reply
                        ]);
                }
            }
    }

    /**
     * @param UploadedFile|null $file
     * @param $type
     * @param $question_id
     * @return mixed|UploadedFile
     */
    protected function doFileUpload(UploadedFile $file = null, $type, $question_id)
    {
        if ($file) {
            $filePrefix = $this->user->username . '-' . $this->profile->name . str_replace(['/', '\/'], '', crypt($question_id)) . '-';
            $file = dispatch(new UploadFilesJob($file, Config::get('defaults.profile.' . $type), $filePrefix));
        }

        return $file;
    }
}