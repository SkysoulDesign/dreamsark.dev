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

        $images = ['milky-way.svg', 'planet-earth.svg', 'moon.svg', 'mercury.svg', 'galaxy.svg', 'stars.svg', 'venus.svg'];

        Group::all()->each(function ($group) use ($images) {


            foreach (range(10, rand(10, 50)) as $index) {

                $image = array_rand($images, 1);

                $item = new Item();
                $item->group()->associate($group);
                $item->setAttribute('name', Faker\Factory::create()->name);
                $item->setAttribute('cost', rand(100, 1000));
                $item->setAttribute('probability', 1);
                $item->setAttribute('image', "img/svg/{$images[$image]}");
                $item->save();

            }

        });

    }
}
