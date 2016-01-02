<?php

namespace DreamsArk\Models\Project\Expenditures;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'expenditure_types';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];

    /**
     * Position Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function position()
    {
        return $this->hasMany(Position::class, 'expenditure_type_id');
    }
}
