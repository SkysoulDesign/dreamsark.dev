<?php

namespace DreamsArk\Models\Project\Expenditures;

use Illuminate\Database\Eloquent\Model;

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
    protected $fillable = ['cost', 'description'];

    /**
     * Expenditure Relationship
     */
    public function expenditure()
    {
        return $this->morphMany(Expenditure::class, 'expenditurable');
    }

    /**
     * Position Relationship
     */
    public function position()
    {
        return $this->belongsTo(Position::class, 'expenditure_position_id');
    }

}
