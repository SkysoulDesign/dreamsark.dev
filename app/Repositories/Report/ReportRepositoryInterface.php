<?php

namespace DreamsArk\Repositories\Report;

use DreamsArk\Models\Report;

interface ReportRepositoryInterface
{
    /**
     * Create a new User on the Database
     *
     * @param array $fields
     * @return Report
     */
    public function create(array $fields);


}