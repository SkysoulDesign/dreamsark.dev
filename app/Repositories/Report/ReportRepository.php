<?php

namespace DreamsArk\Repositories\Report;

use DreamsArk\Models\Report;
use DreamsArk\Repositories\Repository;

class ReportRepository extends Repository implements ReportRepositoryInterface
{

    /**
     * @var Report
     */
    public $model;

    /**
     * @param Report $report
     */
    function __construct(Report $report)
    {
        $this->model = $report;
    }

}