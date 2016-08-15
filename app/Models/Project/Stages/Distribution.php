<?php

namespace DreamsArk\Models\Project\Stages;

use DreamsArk\Models\Traits\CommentableTrait;
use DreamsArk\Models\Traits\ProjectableTrait;
use DreamsArk\Models\Traits\ScopeAbleTrait;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Distribution
 *
 * @package DreamsArk\Models\Project\Stages
 */
class Distribution extends Model
{

    use ProjectableTrait, ScopeAbleTrait, CommentableTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'distributions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['active', 'description', 'poster', 'trailer'];

}
