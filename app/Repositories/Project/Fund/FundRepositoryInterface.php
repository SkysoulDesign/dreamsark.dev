<?php

namespace DreamsArk\Repositories\Project\Fund;

use DreamsArk\Models\Project\Stages\Fund;

interface FundRepositoryInterface
{

    /**
     * Create a Review
     *
     * @param int $project_id
     * @return Fund
     */
    public function create($project_id);

}