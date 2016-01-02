<?php
/**
 * Created by PhpStorm.
 * User: Milewski
 * Date: 11/4/15
 * Time: 12:42 PM
 */

namespace DreamsArk\Repositories\Traits;


use Illuminate\Database\Eloquent\Model;

trait CRUDTrait
{

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
     * Create a Model
     *
     * @param array $fields
     * @return Model
     */
    public function create(array $fields)
    {
        return $this->model->create($fields);
    }

    /**
     * Delete Model
     *
     * @param int $model_id
     * @return bool|null
     */
    public function delete($model_id)
    {
        return $this->model($model_id)->delete();
    }

}