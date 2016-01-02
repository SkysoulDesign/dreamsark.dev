<?php

namespace DreamsArk\Models\Project\Expenditures;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'expenditure_positions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];

    /**
     * Type Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type()
    {
        return $this->belongsTo(Type::class, 'expenditure_type_id');
    }

    /**
     * Cast Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function cast()
    {
        return $this->hasMany(Cast::class, 'expenditure_position_id');
    }

    /**
     * Crew Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function crew()
    {
        return $this->hasMany(Crew::class, 'expenditure_position_id');
    }

    /**
     * Expense Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function expense()
    {
        return $this->hasMany(Expense::class, 'expenditure_position_id');
    }
}
