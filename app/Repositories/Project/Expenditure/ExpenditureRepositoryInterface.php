<?php

namespace DreamsArk\Repositories\Project\Expenditure;

interface ExpenditureRepositoryInterface
{

    /**
     * Get all Model from the DB
     *
     * @param array $columns
     * @return mixed
     */
    public function all(array $columns = ['*']);


}