<?php

namespace DreamsArk\Jobs\General;

use DreamsArk\Jobs\Job;
use File;
use Symfony\Component\HttpFoundation\File\File as UploadFile;

/**
 * Class UploadFilesJob
 *
 * @package DreamsArk\Jobs\General
 */
class UploadFilesJob extends Job
{
    /**
     * @var
     */
    private $file;
    /**
     * @var
     */
    private $uploadPath;

    /**
     * @var
     */
    private $filePath = '';
    /**
     * @var string
     */
    private $public_path;
    /**
     * @var string
     */
    private $targetPath;
    /**
     * @var string
     */
    private $filePrefix;

    /**
     * Create a new job instance.
     *
     * @param UploadFile $file
     * @param $uploadPath
     * @param string $filePrefix
     */
    public function __construct(UploadFile $file, $uploadPath, $filePrefix = '')
    {
        /** @var UploadFile file */
        $this->file = $file;
        $this->uploadPath = $uploadPath;
        $this->public_path = public_path();
        $this->targetPath = $this->public_path . DIRECTORY_SEPARATOR . $this->uploadPath;
        $this->filePrefix = $filePrefix;
    }

    /**
     * Execute the job.
     *
     * @return string
     */
    public function handle()
    {
        if (!File::isDirectory($this->targetPath))
            File::makeDirectory($this->targetPath);
        if (!$this->file->isFile())
            return '';
        $this->moveFile();

        return $this->filePath;
    }

    /**
     * @return string
     * @internal param String $path
     * @internal param string $prefix
     * @internal param File $image
     */
    public function moveFile()
    {
        $extension = $this->file->guessExtension();
        $name = $this->file->getBasename();
        $fileName = @$this->filePrefix . $name . '.' . $extension;
        $this->file->move($this->targetPath, $fileName);
        $this->filePath = $fileName;
    }
}
