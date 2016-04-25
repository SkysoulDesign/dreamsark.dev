<?php

namespace DreamsArk\Jobs\Admin\Question\Option;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Question\Option;

/**
 * Class CreateOptionJob
 *
 * @package DreamsArk\Jobs\Admin\Question\Option
 */
class CreateOptionJob extends Job
{
    /**
     * @var string
     */
    private $name;

    /**
     * Create a new job instance.
     *
     * @param string $name
     */
    public function __construct($name)
    {
        $this->name = $name;
    }

    /**
     * Execute the job.
     *
     * @param Option $option
     * @return Option
     * @todo Implement Repository
     */
    public function handle(Option $option)
    {
        return $option->create([
            'name'         => strtolower($this->name),
            'display_name' => studly_case($this->name)
        ]);
    }

}
