<?php

namespace DreamsArk\Jobs\User\Traits;


use Config;
use DreamsArk\Jobs\General\UploadFilesJob;
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
     * @param $index
     */
    protected function buildDataArrForUpdate($index)
    {
        foreach ($this->request['questions'][$index] as $type => $data) {
            foreach ($data as $id => $reply) {
                $doUpdate = true;
                if (in_array($type, ['file', 'image', 'video'])) {
                    $reply = $this->doFileUpload($reply, $type);
                    if ($reply == '')
                        $doUpdate = false;
                }
                if ($doUpdate)
                    $this->dataArr[] = ['question_id' => $id, 'content' => $reply];
            }
        }
    }

    /**
     * @param $index
     */
    protected function doInsertQuestions($index)
    {
        foreach ($this->request['questions'][$index] as $type => $data) {
            foreach ($data as $id => $reply) {
                if (in_array($type, ['file', 'image', 'video'])) {
                    $reply = $this->doFileUpload($reply, $type);
                }
                $this->answer->questions()->attach($id, [
                    'content' => $reply
                ]);
            }
        }
    }

    protected function doFileUpload(UploadedFile $file = null, $type)
    {
        if ($file) {
            $filePrefix = $this->user->username . '-' . $this->profile->name . '-';
            $file = dispatch(new UploadFilesJob($file, Config::get('defaults.profile.' . $type), $filePrefix));
        }

        return $file;
    }
}