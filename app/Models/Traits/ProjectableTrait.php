<?php

namespace DreamsArk\Models\Traits;

use DreamsArk\Models\Project\Project;

/**
 * Class ProjectableTrait
 *
 * @package DreamsArk\Models\Traits
 */
trait ProjectableTrait
{
    /**
     * Project Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * User Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function user()
    {
        return $this->project->user();
    }

    /**
     * Get Name of the Current Stage
     *
     * @return bool
     */
    public function getStageName()
    {
        return strtolower(class_basename($this));
    }

}
