<?php

namespace DreamsArk\Models\Project;

use DreamsArk\Models\Project\Stages\Idea;
use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Submission
 *
 * @package DreamsArk\Models\Project
 */
class Submission extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'submissions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['content', 'visibility', 'user_id'];

    /**
     * Scope a query to only show visible entries.
     *
     * @param $query
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublic($query)
    {
        return $query->where('visibility', true);
    }

    /**
     * Scope a query to only show private entries.
     *
     * @param $query
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePrivate($query)
    {
        return $query->where('visibility', false);
    }

    /**
     * Scope a query to only show entries owned by an specific user.
     *
     * @param $query
     * @param \DreamsArk\Models\User\User $user
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOwnedBy($query, User $user)
    {
        return $query->where('user_id', $user->id);
    }

    /**
     * User Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Idea Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function idea()
    {
        return $this->belongsTo(Idea::class);
    }

    /**
     * Vote Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function votes()
    {
        return $this->belongsToMany(User::class, 'submission_vote')->withPivot('amount');
    }

    /**
     * Winner Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'submission_winner');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function submissible()
    {
        return $this->morphTo();
    }

}
