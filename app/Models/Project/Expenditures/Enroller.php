<?php

namespace DreamsArk\Models\Project\Expenditures;

use DreamsArk\Models\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
     * User Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user() : belongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Expenditure Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function expenditure() : belongsTo
    {
        return $this->belongsTo(Expenditure::class);
    }

    /**
     * To get Votes w.r.t an Enroller Id
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function votes() : hasMany
    {
        return $this->hasMany(Vote::class);
    }
}
