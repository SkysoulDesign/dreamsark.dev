<?php

namespace DreamsArk\Repositories\Project;

use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Draft;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

interface ProjectRepositoryInterface
{

    /**
     * Get all Model from the DB
     *
     * @param array $columns
     * @return mixed
     */
    public function actives(array $columns = ['*']);

    /**
     * Create a Idea
     *
     * @param int $user_id
     * @param int $type
     * @param array $fields
     * @return Project|Draft
     */
    public function create($user_id, $type, array $fields);

    /**
     * Get all Published projects by User
     *
     * @param int $user_id
     * @return Collection
     */
    public function publishedBy($user_id);

    /**
     * Set The Project to the next Stage
     *
     * @param int $project_id
     * @param string $type
     * @return ProjectRepository
     */
    public function nextStage($project_id, $type);

    /**
     * Fail a project
     *
     * @param int $project_id
     * @return bool
     */
    public function fail($project_id);

    /**
     * Returns all failed Projects
     *
     * @return ProjectRepository
     */
    public function failed();

    /**
     * Returns all submissions for this project stage
     *
     * @param Model $model
     * @param $user_id
     * @param array $fields
     * @return Collection
     * @internal param Model $stage
     * @internal param Model $model
     */
    public function submit(Model $model, $user_id, array $fields);

    /**
     * Returns all submissions for this project stage
     *
     * @param int $project_id
     * @param bool $public Returns Public Submissions
     * @param bool $force Force return all submissions
     * @return Collection
     */
    public function submissions($project_id, $public = true, $force = false);

    /**
     * Back a Expenditure
     *
     * @param int $project_id
     * @param int $user_id
     * @param int $amount
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     * @throws \DreamsArk\Repositories\Exceptions\RepositoryException
     */
    public function back($project_id, $user_id, $amount);
}