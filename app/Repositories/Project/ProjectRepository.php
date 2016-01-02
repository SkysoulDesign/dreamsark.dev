<?php

namespace DreamsArk\Repositories\Project;

use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Project\Stages\Draft;
use DreamsArk\Repositories\Traits\CRUDTrait;
use DreamsArk\Repositories\Traits\RepositoryHelperTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class ProjectRepository implements ProjectRepositoryInterface
{

    use RepositoryHelperTrait, CRUDTrait;

    /**
     * @var Project
     */
    public $model;

    /**
     * @param Project $project
     */
    public function __construct(Project $project)
    {
        $this->model = $project;
    }

    /**
     * Get all Model from the DB
     *
     * @param array $columns
     * @return mixed
     */
    public function actives(array $columns = ['*'])
    {
        return $this->model->active()->get($columns);
    }

    /**
     * Create a Idea
     *
     * @param int $user_id
     * @param int $type
     * @param array $fields
     * @return Project|Draft
     */
    public function create($user_id, $type, array $fields)
    {
        $project = $this->model
            ->setAttribute('user_id', $user_id)
            ->setAttribute('type', $type)
            ->fill($fields);
        $project->save();
        return $project;
    }

    /**
     * Get all Published projects by User
     *
     * @param int $user_id
     * @return Collection
     */
    public function publishedBy($user_id)
    {
        return $this->model->where(compact('user_id'))->get();
    }

    /**
     * Set The Project to the next Stage
     *
     * @param int $project_id
     * @param string $type
     * @return ProjectRepository
     */
    public function nextStage($project_id, $type)
    {
        return $this->model($project_id)->setAttribute('type', $type)->save();
    }

    /**
     * Fail a project
     *
     * @param int $project_id
     * @return bool
     */
    public function fail($project_id)
    {
        return $this->model($project_id)->setAttribute('active', false)->save();
    }

    /**
     * Returns all failed Projects
     *
     * @return ProjectRepository
     */
    public function failed()
    {
        return $this->model->failed()->get();
    }

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
    public function submit(Model $model, $user_id, array $fields)
    {
        return app()->make($model->repository)->submit($model->id, $user_id, $fields);
    }

    /**
     * Returns all submissions for this project stage
     *
     * @param int $project_id
     * @param bool $public Returns Public Submissions
     * @param bool $force Force return all submissions
     * @return Collection
     */
    public function submissions($project_id, $public = true, $force = false)
    {

        $submissions = $this->model($project_id)->stage->submissions();

        if ($force) return $submissions->get();

        if ($public) return $submissions->public()->get();

        return $submissions->private()->get();

    }

    /**
     * Back a Expenditure
     *
     * @param int $project_id
     * @param int $user_id
     * @param int $amount
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     * @throws \DreamsArk\Repositories\Exceptions\RepositoryException
     */
    public function back($project_id, $user_id, $amount)
    {
        return $this->model($project_id)->backers()->attach($user_id, compact('amount'));
    }

}