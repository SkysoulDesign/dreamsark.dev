<?php

namespace DreamsArk\Repositories\Project\Idea;

use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\Project\Submission;

interface IdeaRepositoryInterface
{

    /**
     * Get all Model from the DB
     *
     * @param array $columns
     * @return mixed
     */
    public function all(array $columns = ['*']);

    /**
     * Create a Idea
     *
     * @param int $project_id
     * @param array $fields
     * @return \DreamsArk\Models\Project\Stages\Idea
     */
    public function create($project_id, array $fields);

    /**
     * Submit Idea
     *
     * @param int $idea_id
     * @param int $user_id
     * @param array $fields
     * @return Submission
     */
    public function submit($idea_id, $user_id, array $fields);


}