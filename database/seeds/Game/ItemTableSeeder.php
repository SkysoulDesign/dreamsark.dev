<?php

use DreamsArk\Models\Game\Group;
use DreamsArk\Models\Game\Item;
use Illuminate\Database\Seeder;

/**
 * Class ItemTableSeeder
 */
class ItemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Group::all()->each(function ($group) {

            foreach (range(10, rand(10, 50)) as $index) {
                $item = new Item();
                $item->group()->associate($group);
                $item->setAttribute('cost', rand(100, 1000));
                $item->setAttribute('probability', 1);
                $item->save();
            }

        });

    }
}
