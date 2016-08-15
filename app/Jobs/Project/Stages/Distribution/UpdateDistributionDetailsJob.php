<?php

namespace DreamsArk\Jobs\Project\Stages\Distribution;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Project;
use Symfony\Component\HttpFoundation\FileBag;

/**
 * Class UpdateDistributionDetailsJob
 *
 * @package DreamsArk\Jobs\Project\Stages\Distribution
 */
class UpdateDistributionDetailsJob extends Job
{
    /**
     * @var Project
     */
    private $project;

    /**
     * @var array
     */
    private $fields;

    /**
     * @var FileBag
     */
    private $files;

    /**
     * Create a new job instance.
     *
     * @param Project $project
     * @param array $fields
     * @param FileBag $files
     */
    public function __construct(Project $project, array $fields, FileBag $files)
    {
        $this->project = $project;
        $this->fields = collect($fields);
        $this->files = $files;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $this->project->update([
            'name' => $this->fields->get('name')
        ]);

        $stage = $this->project->getAttribute('stageable');

        /**
         * Upload Content
         */
        foreach ($this->files as $name => $file) {
            $fileName = "$name-{$this->project->getKey()}.{$file->guessExtension()}";
            $path = "uploads";
            $file->move($path, $fileName);
            $stage->setAttribute($name, DIRECTORY_SEPARATOR . $path . DIRECTORY_SEPARATOR . $fileName);
        }

        $stage->setAttribute('description', $this->fields->get('description'));
        $stage->setAttribute('full_description', $this->fields->get('full_description'));
        $stage->save();
    }
}
