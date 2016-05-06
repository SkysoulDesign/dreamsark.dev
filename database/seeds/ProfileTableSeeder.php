<?php

use DreamsArk\Jobs\Admin\Profile\CreateProfileJob;
use Illuminate\Database\Seeder;

class ProfileTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $profiles = [
            'actor',
            'director',
            'camera-man',
            'designer'
        ];

        foreach ($profiles as $profile) {

            $request = [
                'name'         => $profile,
                'display_name' => ucwords($profile),
                'description'  => $profile
            ];

            dispatch(new CreateProfileJob($request, range(1, 5), range(1, 5), array_flip(range(1, 5))));

        }

    }

}
