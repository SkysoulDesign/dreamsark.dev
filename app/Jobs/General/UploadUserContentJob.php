<?php

namespace DreamsArk\Jobs\General;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\User;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Class UploadFilesJob
 *
 * @package DreamsArk\Jobs\General
 */
class UploadUserContentJob extends Job
{

    /**
     * @var User
     */
    private $user;

    /**
     * @var UploadedFile
     */
    private $file;

    /**
     * @var
     */
    private $type;

    /**
     * Create a new job instance.
     *
     * @param UploadedFile $file
     * @param User $user
     * @param $type
     */
    public function __construct(UploadedFile $file, User $user, $type)
    {
        $this->user = $user;
        $this->file = $file;
        $this->type = $type;
    }

    /**
     * Execute the job.
     *
     * @return string
     */
    public function handle()
    {

        /**
         * Filename
         */
        $filename = hash("sha256", 'randomStringBasedOnSomethingAboutTheUser') . "." . $this->file->guessExtension();

        /**
         * Path to the Image on the server
         * 1/images/hash.extension
         */
        $path = "user_content" . DIRECTORY_SEPARATOR . $this->user->id . DIRECTORY_SEPARATOR . str_plural($this->type);

        /**
         * @todo move file to a internal path, so not all users may have access to private content
         */
        $this->file->move(
            public_path($path),
            $filename
        );

        return $path . DIRECTORY_SEPARATOR . $filename;

    }

}