<?php

namespace DreamsArk\Repositories;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Repository
 *
 * @package DreamsArk\Repositories
 */
abstract class Repository
{

    /**
     * @var Model
     */
    protected $model;

    /**
     * Get all of the models from the database.
     *
     * @param  array|mixed $columns
     * @return \Illuminate\Database\Eloquent\Collection|static[]
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
     * @return \Illuminate\Support\Collection|mixed
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
     * Save a new model and return the instance.
     *
     * @param  array $attributes
     * @return Model
     */
    public function create(array $attributes)
    {
        return $this->model->create($attributes);
    }

    /**
     * Update Settings
     *
     * @param Model|Int $model
     * @param array $attributes
     * @return Model
     */
    public function update($model, array $attributes)
    {

        /**
         * If not instance of model, find it and recall this function
         */
        if (!$model instanceof Model)
            return $this->update($this->model($model), $attributes);

        $model->update($attributes);

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