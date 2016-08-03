<?php

use DreamsArk\Models\Game\Group;
use Illuminate\Database\Seeder;

/**
 * Class GroupTableSeeder
 */
class GameGroupTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (range('a', 'z') as $letter) {
            Group::create([
                'name' => $letter
            ]);
        }
    }
}
