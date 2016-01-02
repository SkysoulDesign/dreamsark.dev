<?php

namespace DreamsArk\Repositories\Project\Script;

use DreamsArk\Models\Project\Submission;
use DreamsArk\Models\Project\Stages\Script;

interface ScriptRepositoryInterface
{

    /**
     * Get all Model from the DB
     *
     * @param array $columns
     * @return mixed
     */
    public function all(array $columns = ['*']);

    /**
     * Create a Script
     *
     * @param int $project_id
     * @param array $fields
     * @return Script
     */
    public function create($project_id, array $fields);

    /**
     * Submit Script
     *
     * @param int $script_id
     * @param int $user_id
     * @param array $fields
     * @return Submission
     */
    public function submit($script_id, $user_id, array $fields);


}