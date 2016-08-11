<?php

namespace DreamsArk\Models\Project\Expenditures;

use DreamsArk\Models\Project\Project;
use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * Class Expenditure
 *
 * @package DreamsArk\Models\Project\Expenditures
 */
class Expenditure extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'expenditures';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * Filter Down only expenses that can be enroll
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     */
    public function scopeEnrollable(Builder $query)
    {
        $query->where('expenditurable_type', 'crews');
    }

    /**
     * Filter Down only expenses
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     */
    public function scopeExpensable(Builder $query)
    {
        $query->where('expenditurable_type', 'expenses');
    }

    /**
     * Project Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function project() : belongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Polymorphic Relations
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function expenditurable() : morphTo
    {
        return $this->morphTo();
    }

    /**
     * Enrollers Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function enrollers() : hasMany
    {
        return $this->hasMany(Enroller::class);
    }

    /**
     * Inverse of the relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function enroller() : belongsToMany
    {
        return $this->belongsToMany(User::class, 'expenditure_enrollers');
    }

    /**
     * Alias to Enrollers inverted
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
//    public function users() : belongsToMany
//    {
//        return $this->belongsToMany(User::class, 'expenditure_enrollers');
//    }

    /**
     * Vote Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function votes() : hasManyThrough
    {
        return $this->hasManyThrough(Vote::class, Enroller::class);
    }

}
