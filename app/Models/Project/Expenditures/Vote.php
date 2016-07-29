<?php

namespace DreamsArk\Models\Project\Expenditures;

use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Vote
 *
 * @package DreamsArk\Models\Project\Expenditures
 */
class Vote extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'expenditure_enroller_vote';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = ['active' => 'boolean'];

    /**
     * User Relationship
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Enroller Relationship
     */
    public function enroller()
    {
        return $this->belongsTo(Enroller::class);
    }
}
