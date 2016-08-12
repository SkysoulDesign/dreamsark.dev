<?php

namespace DreamsArk\Jobs\Project\Stages\Distribution;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Stages\Distribution;

/**
 * Class UpdateDistributionDetailsJob
 *
 * @package DreamsArk\Jobs\Project\Stages\Distribution
 */
class UpdateDistributionDetailsJob extends Job
{
    /**
     * @var Distribution
     */
    private $distribution;

    /**
     * @var array
     */
    private $fields;

    /**
     * Create a new job instance.
     *
     * @param Distribution $distribution
     * @param [szzzzz] $fields
     */
    public function __construct(Distribution $distribution, array $fields)
    {
        $this->distribution = $distribution;
        $this->fields = $fields;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->distribution->update(
            $this->fields
        );
    }
}
