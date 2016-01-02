<?php

namespace DreamsArk\Repositories\Traits;


use DreamsArk\Repositories\Exceptions\RepositoryException;
use Illuminate\Database\Eloquent\Model;

trait RepositoryHelperTrait
{

    /**
     * Set this model instance by a given id
     *
     * @param $model_id
     * @return Model
     */
    public function model($model_id)
    {

        /**
         * If it's already an model then set it
         */
        if ($model_id instanceof Model) {
            return $this->model = $model_id;
        }

        return $this->model->findOrFail($model_id);
    }

    /**
     * Return a new instance with the specified model as base
     *
     * @param Model|int $model
     * @param string $baseClass
     * @return $this
     * @throws RepositoryException
     */
    public function newInstance($model = null, $baseClass = null)
    {
        /**
         * If There is no Interface Set
         */
        if (class_exists(get_class($this) . 'Interface')) {
            throw new RepositoryException('Please interface not set for your Repository, please create one first.');
        }

        /**
         * If the $baseClass does not exist
         */
        if ($baseClass !== null && !class_exists($baseClass)) {
            throw new RepositoryException('Please Insert a valid baseClass');
        }

        $instance = app()->make(get_class($this) . 'Interface');

        /**
         * if it's an ID then find it
         */
        if (is_numeric($model) && $baseClass === null) {
            $instance->model = $instance->model->findOrFail($model);
        }

        /**
         * If Model is a Model then set this model
         */
        if ($model instanceof Model) {
            $instance->model = $model;
        }

        /**
         * if it`s a full Qualified Class then initialize it
         */
        if (is_string($model) && class_exists($model)) {
            $instance->model = app()->make($model);
        }

        /**
         * if an id is sent though $model then set to the $baseclass
         */
        if (is_numeric($model) && class_exists($baseClass)) {
            $instance->model = app($baseClass)->findOrFail($model);
        }

        /**
         * If the base class is set and no model is set
         */
        if ($model === null && class_exists($baseClass)) {
            $instance->model = app($baseClass);
        }

        return $instance;

    }

    /**
     * Returns This Model
     *
     * @inheritdoc
     */
    public function get()
    {
        return $this->model;
    }

}