<?php

namespace DreamsArk\Jobs;

use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteItemByObjectJob
 * @package DreamsArk\Jobs
 */
class DeleteItemByObjectJob extends Job
{
    /**
     * @var
     */
    private $object;

    /**
     * Create a new job instance.
     *
     * @param $object
     */
    public function __construct(Model $object)
    {
        //
        $this->object = $object;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->object->delete();
        return true;
    }
}
