<?php

namespace DreamsArk\Models\Project\Expenditures;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * Class Expense
 *
 * @package DreamsArk\Models\Project\Expenditures
 */
class Expense extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'expenditure_expenses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['cost', 'description', 'name'];

    /**
     * Expenditure Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function expenditure() : morphMany
    {
        return $this->morphMany(Expenditure::class, 'expenditurable');
    }

    /**
     * Position Relationship
     */
    /*public function position()
    {
        return $this->belongsTo(Position::class, 'expenditure_position_id');
    }*/

}
