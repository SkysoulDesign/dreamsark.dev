<?php

namespace DreamsArk\Repositories\Traits;

trait FallibleTrait
{
    /**
     * Fail this model
     *
     * @param int $model_id
     * @return bool
     */
    public function fail($model_id)
    {
        return $this->model($model_id)->setAttribute('active', false)->save();
    }
}