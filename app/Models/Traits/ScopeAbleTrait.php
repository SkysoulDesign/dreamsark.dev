<?php

namespace DreamsArk\Models\Traits;


trait ScopeAbleTrait
{
    /**
     * @param $query
     * @return mixed
     */
    public function scopePending($query)
    {
        return $query->where('active', false);
    }

    /**
     * @param $query
     * @return mixed
     */
    public function scopeActives($query)
    {
        return $query->where('active', true);
    }
}