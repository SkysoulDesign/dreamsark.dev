<?php

namespace DreamsArk\Models\Project\Stages;

use DreamsArk\Models\Traits\CommentableTrait;
use DreamsArk\Models\Traits\ProjectableTrait;
use DreamsArk\Models\Traits\RewardableTrait;
use DreamsArk\Models\Traits\SubmissibleTrait;
use DreamsArk\Models\Traits\VotableTrait;
use DreamsArk\Repositories\Project\Script\ScriptRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Script
 *
 * @package DreamsArk\Models\Project\Stages
 */
class Script extends Model
{

    use ProjectableTrait, VotableTrait, SubmissibleTrait, RewardableTrait, CommentableTrait;

    /**
     * Defines the minimum of submission this model
     * should have to be considered not failed
     */
    const MINIMUM_OF_SUBMISSIONS = 1;

    /**
     * Define this model Repository.
     *
     * @var string
     */
    public $repository = ScriptRepositoryInterface::class;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'scripts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['content'];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = ['active' => 'boolean'];

    /**
     * Define Which is the next Model
     */
    protected $next = Review::class;

    /**
     * Scope a query to only show visible entries.
     *
     * @param $query
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
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePrivate($query)
    {
        return $query->where('visibility', false);
    }

}
