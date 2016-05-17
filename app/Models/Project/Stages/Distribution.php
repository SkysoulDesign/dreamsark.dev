<?php

namespace DreamsArk\Models\Project\Stages;

use DreamsArk\Models\Project\Project;
use DreamsArk\Models\Traits\ProjectableTrait;
use Illuminate\Database\Eloquent\Model;

class Distribution extends Model
{
    use ProjectableTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'distributions';

    protected $fillable = ['project_id', 'active'];

    /**
     * Project Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
