<?php

namespace DreamsArk\Models\Project;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Reward
 *
 * @package DreamsArk\Models\Project
 */
class Reward extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'project_reward';

    /**
     * @var array
     */
    protected $fillable = ['project_id', 'rewardable_id', 'rewardable_type', 'amount', 'items'];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = ['items' => 'json'];

    /**
     * Relation to Project Table
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function project() : belongsTo
    {
        return $this->belongsTo(Project::class);
    }

}
