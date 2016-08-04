<?php

namespace DreamsArk\Models\Game;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Class Recipe
 *
 * @package DreamsArk\Models\Game
 */
class Recipe extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'game_recipes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['items', 'item_id'];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'items' => 'json'
    ];

    public function scopeBake(Builder $query, array $items)
    {
        //"select * from `game_item_recipes` where `items`->"$.id" = ?"
        //"select * from `game_item_recipes` where items->"$.id" = 3"
        $query->whereHas("items", function(){

        });

        dd($query->get());

    }

    /**
     * Item Relationship
     *
     * @return BelongsTo
     */
    public function item() : belongsTo
    {
        return $this->belongsTo(Item::class);
    }

    /**
     * Items Relationship
     *
     * @return BelongsToMany
     */
    public function items() : belongsToMany
    {
        return $this->belongsToMany(Item::class, 'game_item_recipe');
    }

}
