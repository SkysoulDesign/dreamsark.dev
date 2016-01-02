<?php

namespace DreamsArk\Repositories\Project\Review;

use DreamsArk\Models\Project\Stages\Review;

interface ReviewRepositoryInterface
{

    /**
     * Create a Review
     *
     * @param int $project_id
     * @return Review
     */
    public function create($project_id);

}