<?php

namespace SkysoulDesign\Game;

use DreamsArk\Models\Game\Item;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Game
 *
 * @package SkysoulDesign\Game
 */
class Game
{

    /**
     * @var \DreamsArk\Models\Game\Item
     */
    private $item;

    public function __construct(Item $item)
    {
        $this->item = $item;
    }

    /**
     * @param \Illuminate\Database\Eloquent\Model $stage
     */
    public function getRewardForStage(Model $stage)
    {
        $this->item->groups(['a', 'b', 'c'])->weighted()->limit(4)->get();
    }

    public function groupAndItem($l_CurrentGroup)
    {
        $items = Item::where('game_group_id', 1)
            ->orWhere('game_group_id', 2)
            ->orderByRaw('probability * rand()', 'desc')
            ->limit(2)
            ->toSql();

        dd($items);

        foreach ($l_CurrentGroup['ItemData'] as $data) {
            $item = new Item($data);
            dd($item);
        }

    }

}
