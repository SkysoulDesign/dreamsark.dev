<?php

namespace DreamsArk\Repositories\Project\Synapse;

use DreamsArk\Models\Project\Submission;
use DreamsArk\Models\Project\Stages\Synapse;

interface SynapseRepositoryInterface
{

    /**
     * Get all Model from the DB
     *
     * @param array $columns
     * @return mixed
     */
    public function all(array $columns = ['*']);

    /**
     * Create a Synapse
     *
     * @param int $project_id
     * @param array $fields
     * @return \DreamsArk\Models\Project\Stages\Synapse
     */
    public function create($project_id, array $fields);

    /**
     * Submit Synapse
     *
     * @param int $synapse_id
     * @param int $user_id
     * @param array $fields
     * @return Submission
     */
    public function submit($synapse_id, $user_id, array $fields);


}