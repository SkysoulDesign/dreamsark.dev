<?php

namespace DreamsArk\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

abstract class Repository
{

    /**
     * @var Model
     */
    protected $model;

    /**
     * Get all Model from the DB
     *
     * @param array $columns
     * @return mixed
     */
    public function all(array $columns = ['*'])
    {
        return $this->model->all($columns);
    }

    /**
     * Return all object within the where conditions
     * Best Usage with compact('value1', 'value2')
     *
     * @param $args
     * @return Collection|mixed
     */
    public function where($args)
    {
        /**
         * Remove if value is set to all so everything would be selected
         */
        $args = collect($args)->filter(function ($value) {
            return $value != 'all' ?: false;
        });

        return $this->model->where($args->toArray())->get();

    }

    /**
     * Create a new entry on the Database
     *
     * @param array $fields
     * @return Model
     */
    public function create(array $fields)
    {
        return $this->model->create($fields);
    }

    /**
     * Update Settings
     *
     * @param Model|Int $model
     * @param array $fields
     * @return Model
     */
    public function update($model, array $fields)
    {

        /**
         * If not instance of model, find it and recall this function
         */
        if (!$model instanceof Model)
            return $this->update($this->model($model), $fields);

        $model->update($fields);

        return $model->fresh();

    }

    /**
     * Set this model instance by a given id
     *
     * @param $model_id
     * @return Model
     */
    public function model($model_id)
    {
        return $this->model->findOrFail($model_id);
    }

}