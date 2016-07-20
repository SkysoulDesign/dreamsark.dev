<?php

namespace DreamsArk\Models\Traits;

use DreamsArk\Models\Project\Comment;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * Class CommentableTrait
 *
 * @package DreamsArk\Models\Traits
 */
trait CommentableTrait
{
    /**
     * Get all of the owning commentable models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function comments() : MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
