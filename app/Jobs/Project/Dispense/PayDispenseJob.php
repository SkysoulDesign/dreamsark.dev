<?php

namespace DreamsArk\Jobs\Project\Dispense;

use DreamsArk\Events\Project\Dispense\DispenseWasPaid;
use DreamsArk\Jobs\Job;
use DreamsArk\Models\Project\Expenditures\Dispense;

/**
 * Class PayDispenseJob
 *
 * @package DreamsArk\Jobs\Project\Dispense
 */
class PayDispenseJob extends Job
{
    /**
     * @var \DreamsArk\Models\Project\Expenditures\Dispense
     */
    private $dispense;

    /**
     * @var int
     */
    private $amount;

    /**
     * Create a new job instance.
     *
     * @param \DreamsArk\Models\Project\Expenditures\Dispense $dispense
     * @param int $amount
     */
    public function __construct(Dispense $dispense, int $amount)
    {
        $this->dispense = $dispense;
        $this->amount = $amount;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->dispense->setAttribute('paid', $this->amount);
        $this->dispense->save();

        /**
         * Announce DispenseWasPaid
         */
        event(new DispenseWasPaid($this->dispense));
    }
}
