<?php

namespace DreamsArk\Jobs\Admin\Question\Section;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Question\Section;
use DreamsArk\Models\Master\Question\Type;

/**
 * Class CreateSectionJob
 *
 * @package DreamsArk\Jobs\Admin\Question\Section
 */
class CreateSectionJob extends Job
{
    /**
     * @var string
     */
    private $field;

    /**
     * Create a new job instance.
     *
     * @param string $field
     */
    public function __construct(string $field)
    {
        $this->field = $field;
    }

    /**
     * Execute the job.
     *
     * @param Section $section
     * @return Type
     */
    public function handle(Section $section)
    {
        return $section->create([
            'name' => $this->field
        ]);
    }
}
