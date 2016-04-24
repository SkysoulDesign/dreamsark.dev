<?php

namespace DreamsArk\Jobs\Admin\Question\Type;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Master\Question\Type;

/**
 * Class CreateTypeJob
 *
 * @package DreamsArk\Jobs\Admin\Question\Type
 */
class CreateTypeJob extends Job
{

    /**
     * @var array
     */
    private $fields;

    /**
     * Create a new job instance.
     *
     * @param array $fields
     */
    public function __construct(array $fields)
    {
        $this->fields = $fields;
    }

    /**
     * Execute the job.
     *
     * @param Type $type
     * @todo Implement Repository
     * @return Type
     */
    public function handle(Type $type)
    {
        return $type->create($this->fields);
    }

}
