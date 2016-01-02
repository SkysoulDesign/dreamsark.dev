<?php

namespace DreamsArk\Models\Project\Stages;

use DreamsArk\Models\Traits\ProjectableTrait;
use DreamsArk\Models\Traits\SubmissibleTrait;
use DreamsArk\Models\Traits\VotableTrait;
use DreamsArk\Repositories\Project\Synapse\SynapseRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class Synapse extends Model
{

    use ProjectableTrait, VotableTrait, SubmissibleTrait;

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
    public $repository = SynapseRepositoryInterface::class;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'synapses';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['content', 'reward'];

    /**
     * Define Which is the next Model
     */
    protected $next = Script::class;

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
