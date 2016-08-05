<?php

namespace DreamsArk\Models\Project\Stages;

use DreamsArk\Models\Traits\CommentableTrait;
use DreamsArk\Models\Traits\ProjectableTrait;
use DreamsArk\Models\Traits\ScopeAbleTrait;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Review
 *
 * @package DreamsArk\Models\Project\Stages
 */
class Review extends Model
{

    use ProjectableTrait, ScopeAbleTrait, CommentableTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'reviews';

    /**
     * Define Which is the next Model
     */
    protected $next = Fund::class;

}
