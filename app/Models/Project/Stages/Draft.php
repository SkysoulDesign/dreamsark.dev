<?php

namespace DreamsArk\Models\Project\Stages;

use DreamsArk\Models\Project\Project;
use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Model;

class Draft extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'project_draft';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'reward', 'content', 'voting_date'];

    /**
     * User Relationship
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Project Relationship
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
