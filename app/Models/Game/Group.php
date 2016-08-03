<?php

namespace DreamsArk\Models\Game;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Group
 *
 * @package DreamsArk\Models\Game
 */
class Group extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'game_groups';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];

    public function items()
    {
        return $this->hasMany(Item::class);
    }

}
