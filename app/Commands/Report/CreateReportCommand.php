<?php

namespace DreamsArk\Commands\Report;

use DreamsArk\Commands\Command;
use DreamsArk\Repositories\Report\ReportRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Http\Request;

class CreateReportCommand extends Command implements SelfHandling
{
    /**
     * @var Request
     */
    private $fields;

    /**
     * Create a new command instance.
     *
     * @param array $fields
     */
    public function __construct(array $fields)
    {
        $this->fields = $fields;
    }

    /**
     * Execute the command.
     *
     * @param ReportRepositoryInterface $repository
     */
    public function handle(ReportRepositoryInterface $repository)
    {
        $report = $repository->create($this->fields);
    }
}
