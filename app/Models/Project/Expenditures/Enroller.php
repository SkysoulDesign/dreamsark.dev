<?php

namespace DreamsArk\Models\Project\Expenditures;

use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Enroller
 *
 * @package DreamsArk\Models\Project\Expenditures
 */
class Enroller extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'expenditure_enrollers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    /**
     * User Relationship
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Expenditure Relationship
     */
    public function expenditure()
    {
        return $this->belongsTo(Expenditure::class);
    }

    /**
     * Voting Relationship
     * A User Belongs to a Enrollable Table
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function votes()
    {
        return $this->belongsToMany(User::class, 'expenditure_enroller_vote')->withPivot('amount')->withTimestamps();
    }

    /**
     * To get Votes w.r.t an Enroller Id
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function enrollvotes()
    {
        return $this->hasMany(Vote::class);
    }
}
