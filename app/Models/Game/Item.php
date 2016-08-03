<?php

namespace DreamsArk\Models\Game;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Item
 *
 * @package DreamsArk\Models\Game
 */
class Item extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'game_group_item';


    /**
     * Scope Query by groups
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param array $groups
     */
    public function scopeGroups(Builder $query, array $groups)
    {
        foreach ($groups as $group) {
            $query->orWhereHas('group', function (Builder $query) use ($group) {
                $query->whereName($group);
            });
        }
    }

    /**
     * Get Only Weighted Values
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     */
    public function scopeWeighted(Builder $query)
    {
        $query->orderByRaw('probability * rand() desc');
    }

    /**
     * Group Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group()
    {
        return $this->belongsTo(Group::class);
    }

}
