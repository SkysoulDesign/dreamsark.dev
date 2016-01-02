<?php

namespace DreamsArk\Models\Traits;

trait EnrollableTrait
{
    /**
     * Get All Enrollable Position on the Expenditure
     *
     * @return mixed
     */
    public function enrollable()
    {
        return $this->project->enrollable();
    }

}