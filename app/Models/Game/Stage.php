<?php

namespace DreamsArk\Models\Game;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Group
 *
 * @package DreamsArk\Models\Game
 */
class Stage extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'game_stage_data';

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'reward_points' => 'json',
        'give_reward' => 'json',
        'group_and_probability' => 'json'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    public function items()
    {
        return $this->hasMany(Item::class, 'game_group_id');
    }

    public function stage()
    {
        return $this->morphTo('stageable');
    }

}
