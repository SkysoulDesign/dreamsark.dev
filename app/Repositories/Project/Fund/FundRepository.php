<?php

namespace DreamsArk\Repositories\Project\Fund;

use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Fund;
use DreamsArk\Repositories\Traits\CRUDTrait;
use DreamsArk\Repositories\Traits\FallibleTrait;
use DreamsArk\Repositories\Traits\RepositoryHelperTrait;

class FundRepository implements FundRepositoryInterface
{

    use RepositoryHelperTrait, FallibleTrait, CRUDTrait;

    /**
     * @var Fund
     */
    public $model;

    /**
     * @param Fund $fund
     */
    function __construct(Fund $fund)
    {
        $this->model = $fund;
    }

    /**
     * Create a Fund
     *
     * @param int $project_id
     * @return Fund
     */
    public function create($project_id)
    {
        return $this->newInstance($project_id, Project::class)->model->fund()->create([]);
    }

}