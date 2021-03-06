<?php

namespace DreamsArk\Models\Traits;

use DreamsArk\Models\Project\Submission;

/**
 * Class SubmissibleTrait
 *
 * @package DreamsArk\Models\Traits
 */
trait SubmissibleTrait
{
    /**
     * Submission Relationship
     * Only Available once there is a winner for this project
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function submission()
    {
        return $this->belongsTo(Submission::class);
    }

    /**
     * Submission Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\morphMany
     */
    public function submissions()
    {
        return $this->morphMany(Submission::class, 'submissible');
    }

}
