<?php

namespace DreamsArk\Models\Project\Stages;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'votes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['open_date', 'close_date'];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['open_date', 'close_date'];

    /**
     * Scope a query to only show open entries.
     *
     * @param $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOpened($query)
    {
        return $query->where('active', true);
    }

    /**
     * Scope a query to only show close entries.
     *
     * @param $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeClosed($query)
    {
        return $query->where('active', false);
    }

    /**
     * Get all of the owning votable models.
     */
    public function votable()
    {
        return $this->morphTo();
    }

    /**
     * Project Relationship
     */
    public function project()
    {
        return $this->votable->project();
    }

}
